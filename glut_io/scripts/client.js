var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.changeVelo = function(v){
	Client.socket.emit('changeVelo', v);
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y, data.v);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y, data[i].v);
    }
});

Client.socket.on('remove',function(id){
    Game.removePlayer(id);
});

Client.socket.on('move', function(player){
	Game.movePlayer(player);
});