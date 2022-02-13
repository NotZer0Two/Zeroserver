const { crypt, decrypt, compare } = require('./crypter')
const { config } = require('./config')
const { Database } = require("quickmongo");
const loggedIn = {}
const waitLoginPromises = {}
const db = new Database("MongoDBurl");

db.on("ready", () => {
  console.log(" [DATABASE] Connected to the Database");
});

db.connect();

console.log("> [ZeroAuth] Plugin enable")

module.exports.player = async function(player, serv) {

  player.on('spawned', async function() { // Say hey to the user!
    const playerauth = await db.has(player.uuid)
    loggedIn[player.uuid] = false
    if (playerauth) return player.chat("§aLogin with /login <password>")
    else player.chat("§cRegister with /register <password> <password>")
  })

  const cancelPacket = (ignore, cancel) => {
    if (loggedIn[player.uuid]) return
    cancel()
  }

  // add commands
  serv.commands.add({
    base: 'login',
    aliases: [],
    info: 'register to the server',
    usage: '/login [password]',
    op: false,
    async action (password) {
      const playerauth = await db.has(player.uuid)
      if (loggedIn[player.uuid]) {
        return player.chat("§cYou are already logged in")
      }
      if (!playerauth) {
        return player.chat(config.messages.register)
      }
      const hash = await db.get(player.uuid)
      if (compare(crypt(password), hash)) {
        loggedIn[player.uuid] = true // remove the player from not logged in list
        if (waitLoginPromises[player.uuid]) waitLoginPromises[player.uuid]() // player.waitLogin
        player.chat("§aSuccessfully logged in!")
      } else {
        player.chat("§cWrong password!")
      }
    }
  })

  serv.commands.add({
    base: 'register',
    aliases: [],
    info: 'register to the server',
    usage: '/register [password] [password]', 
    op: false,
    async action (rawargs) {
      const playerauth = await db.has(player.uuid)
      const args = rawargs.split(' ')
      if (playerauth) {
        return player.chat("§cYou are already registered.")
      }
      if (args[0] !== args[1]) {
        return player.chat("§cYour passwords are not the same!")
      }
      await db.set(
        player.uuid,
        crypt(args[0], 10)
      )
      player.chat("§aSuccessfully registered!")
      player.chat("§aLogin with /login <password>")
    }
  })

  serv.commands.add({
    base: 'reset',
    aliases: ["resetpaswd", "resetpassword"],
    info: 'reset the password',
    usage: '/register [password] [password]', 
    op: false,
    async action (rawargs) {
      const playerauth = await db.has(player.uuid)
      const args = rawargs.split(' ')
      if (!playerauth) {
        return player.chat("§cHOW TF YOU LOGGED IN FIRST?")
      }
      if (args[0] == args[1]) {
        return player.chat("§cits the same old password!")
      }
      const hash = await db.get(player.uuid)
      if (compare(crypt(args[0]), hash)) {
        await db.delete(player.uuid)
        await db.set(
          player.uuid,
          crypt(args[1], 10)
        )
        player.chat("§aSuccessfully changed password!")
      } else {
        player.chat("§cWrong password!")
      }
    }
  })

  if (config.protection) {
    player.on('chat_cancel', (ignore, cancel) => {
      if (loggedIn[player.uuid]) return
      player.chat("§cYou must be logged in to chat")
      cancel()
    })
    player.on('command_cancel', ({ command }, cancel) => {
      const cmd = command.split(' ')[0]
      if (loggedIn[player.uuid]) return
      if (config.allowedCommands.includes(cmd)) return
      player.chat("§cYou must be logged in to use commands")
      cancel()
    })
    player.on('move_cancel', cancelPacket)
    player.on('placeBlock_cancel', cancelPacket)
    player.on('dig_cancel', cancelPacket)
    player.on('dug_cancel', cancelPacket)
    player.on('punch_cancel', cancelPacket)
  }
}
