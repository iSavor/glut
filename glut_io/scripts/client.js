var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function() {
    Client.socket.emit('newplayer');
};

Client.changeVelo = function(v) {
    Client.socket.emit('changeVelo', v);
};

Client.slowDown = function() {
    Client.socket.emit('slowDown');
}

Client.socket.on('setCam', function(id){
	Game.setCam(id);
});

Client.socket.on('newplayer', function(data) {
	console.log("new");
    Game.addNewPlayer(data.id, data.x, data.y, data.v);
});

Client.socket.on('allplayers', function(data) {
    for (var i = 0; i < data.length; i++) {
        Game.addNewPlayer(data[i].id, data[i].x, data[i].y, data[i].v);
    }
});

Client.socket.on('remove', function(id) {
    Game.removePlayer(id);
});

Client.socket.on('move', function(player) {
	console.log(player.v)
    Game.movePlayer(player);
});
