var server  = require('./src/server.js')

process.on('uncaughtException', function (exception) {
    console.log("Uncaught exception: " + exception);
});
