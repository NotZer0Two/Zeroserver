var server  = require('./src/server.js')
const express = require('express')
const app = express()

process.on('uncaughtException', function (exception) {
    console.log("Uncaught exception: " + exception);
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log("Server started on port " + process.env.PORT))