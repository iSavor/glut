var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen('8080', function() {
    console.log('Listening on ' + server.address().port);
});

server.lastPlayderID = 0;

io.on('connection', function(socket) {
    socket.on('newplayer', function() {
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(0, 1920),
            y: randomInt(0, 1920),
            v: [0, 0]
        };
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer', socket.player);
        socket.emit('setCam', socket.player.id);

        socket.on('disconnect', function() {
            io.emit('remove', socket.player.id);
        });

        socket.on('changeVelo', function(v) {
            socket.player.v = socket.player.v.map((ele, index) => ele + v[index]);
            if (socket.player.v[0] > 200) {
                socket.player.v[0] = 200;
            } else if (socket.player.v[0] < -200) {
                socket.player.v[0] = -200;
            }
            if (socket.player.v[1] > 200) {
                socket.player.v[1] = 200;
            } else if (socket.player.v[1] < -200) {
                socket.player.v[1] = -200;
            }
            socket.broadcast.emit('moveother', socket.player);
            socket.emit('move', socket.player);
        });

        socket.on('slowDown', function() {
            if (socket.player.v[0] != 0) {
                if (socket.player.v[0] > 0) {
                    socket.player.v[0] -= 10;
                } else {
                    socket.player.v[0] += 10;
                }
            }
            if (socket.player.v[1] != 0) {
                if (socket.player.v[1] > 0) {
                    socket.player.v[1] -= 10;
                } else {
                    socket.player.v[1] += 10;
                }
            }
            socket.broadcast.emit('moveother', socket.player);
            socket.emit('move', socket.player);
            //io.emit('move', socket.player);
        });
    });
});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
