var livereload = require('livereload');
var lrserver = livereload.createServer();
var opn = require('opn');
var express = require('express')
var serveIndex = require('serve-index')
lrserver.watch(__dirname + "/output");
var port = 2411
var app = express()
app.use(
    '/',
    serveIndex(
        'output',
        {
            'icons': true
        }
    )
)
app.use(express.static('output'))
app.listen(port)
var url = 'http://127.0.0.1:' + port
console.log(url)
opn(url)
