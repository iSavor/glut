var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen('8080', function(){
    console.log('Listening on ' + server.address().port);
})