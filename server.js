var livereload = require('livereload');
var lrserver = livereload.createServer();
var express = require('express')
lrserver.watch(__dirname + "/output");
var app = express()
app.use(express.static('output'))
app.listen(3000)
console.log('http://127.0.0.1:3000')
