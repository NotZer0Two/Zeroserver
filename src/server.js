const mcServer = require('flying-squid')
mcServer.createMCServer({
  'motd': `§a§l§oFREE §r§a§l§nOP SERVER!\n§r§4§lANARCHY CREATIVE | GRIEFING ALLOWED`,
  'port': 25565,
  'max-players': 0,
  'online-mode': false,
  'logging': true,
  'gameMode': 0,
  'difficulty': 0,
  'worldFolder':'world',
  'generation': {
    'name': 'diamond_square',
    'options':{
      'worldHeight': 80
    }
  },
  'kickTimeout': 10000,
  'plugins': {
    "zeroessentials": {},
    "zeroauth": true,
  },
  'modpe': false,
  'view-distance': 10,
  'player-list-text': {
    'header':`§aZeroNode v1.0.0`,
    'footer':`§aAnarchy Creative | Griefing Allowed`
  },
  'everybody-op': true,
  'max-entities': 10000,
  'version': '1.8'
})