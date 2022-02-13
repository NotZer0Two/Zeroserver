var prefix = "[ZeroEssentials] ";
console.log(prefix + "Plugin enabled");
module.exports.player = (player, serv) => {
  player.on("spawned", () => {
    if(player.uuid == "800e4d19-3f2b-3b99-a675-b113b1fcb6e1") {
      player.username = "&c[&4Admin&c]&r " + player.username;
    }
    if(player.uuid == "d5230645-52a6-4c35-ba55-a92e17ceaa5e") {
      player.username = "&e[&6Friend&e]&r " + player.username;
    }
  });
  serv.on("error", (err) => {
    console.log(err);
  })

  serv.commands.add(
    {
      base: 'ping',
      aliases: ['ping'],
      info: 'Ping? Pong',
      op: true,
      action(args) {
        player.chat(prefix + "Pong!");
      }
    }
  );
  serv.commands.add({
    base: 'afk',
    info: 'Are you afk? Type it',
    usage: '/afk',
    op: true,
    action(args) {
      serv.broadcast(prefix + player.username + " is AFK!");
    }
  });
  serv.commands.add({
    base: 'suicide',
    info: 'Commit a suicide',
    usage: '/suicide',
    op: true,
    action(args) {
      serv.broadcast(prefix + player.username + " suicided! Bye bad world");
      player.updateHealth(0);
    }
  });

  serv.commands.add({
    base: 'serverinfo',
    info: 'Info About the server',
    usage: '/serverinfo',
    op: true,
    action(args) {
      player.chat(prefix + "Fork of flying-squid on github but more fixed and updated (Currently Private) but Hey you can enjoy this exploit server test of this custom version, but support the real owner https://github.com/PrismarineJS/flying-squid");
    }
  });

  serv.commands.add({
    base: 'nick',
    aliases: ['nick'],
    info: 'Changes your nickname',
    usage: '/nick [TheNickYouWant]',
    op: true,
    action(args) {
      if (args.length >= 1) {
        player.username = args;
        player.chat("You name changed sucessfully!");
      }
    }
  });

  serv.commands.add({
    base: 'broadcast',
    aliases: ['broadcast'],
    info: 'Changes your nickname',
    usage: '/broadcast [What you want display]',
    op: true,
    action(args) {
      if (args.length >= 1) {
        if(player.uuid == "800e4d19-3f2b-3b99-a675-b113b1fcb6e1") {
          serv.broadcast("[&cBroadcast&r] &c" + args);
        }
      }
    }
  });

  serv.commands.add({
    base: 'heal',
    aliases: ['heal'],
    info: 'Heal you or another player',
    usage: '/heal',
    op: true,
    action(args) {
      if (args.length === 0) {
        player.updateHealth(20);
        player.chat(prefix + "You healed yourself!");
      }/*else{
                serv.getPlayer(args).updateHealth(20);
                player.chat(prefix + "You healed " + args + "!");
                serv.getPlayer(args).chat(prefix + "You have been healed!");
            }*/}
  });
  serv.commands.add({

    base: 'msg',
    aliases: ['m'],
    info: 'Message a player',
    usage: '/teleport [target player] <destination player or x> [y] [z]',
    op: true,
    parse(str) {
      return str.match(/^(((.* )?~?-?\d* ~?-?\d* ~?-?\d*)|(.+ .+))$/) ? str.split(' ') : false;
    },
    action(args) {
      if (args.length >= 1) {
        var now = 0;
        var todos = args.length;
        var msg = "";
        while (now <= todos) {
          if (now != 0) {
            msg = msg + args[now];
          }
        }
        serv.getPlayer(args[0]).chat(msg);
      }
    }
  }
  
  );
};