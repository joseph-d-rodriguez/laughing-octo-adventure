
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);

app.get('/', function(req, res) {
	res.sendFile(path.resolve(path.join(__dirname,'/index.html')));
});

server.listen(3333);


/*
var http = require('http');
var fs = require('fs');
var myServer = http.createServer();
myServer.on('request', function(req, res) {
	var indexReadStream = fs.createReadStream('./index.html');
	indexReadStream.pipe(res);
});

myServer.listen(3333);
*/