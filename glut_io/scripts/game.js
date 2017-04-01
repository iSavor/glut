var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var game;
var cursors;
var Game = {};

function login() {
    gameInit();
}

function gameInit() {
    game = new Phaser.Game(width, height, Phaser.AUTO, document.getElementById('game'));
    game.state.add('Game', Game);
    game.state.start('Game');
}

Game.init = function(){
    game.state.disableVisibilityChange = true;
    cursors = game.input.keyboard.createCursorKeys();
}

Game.preload = function() {
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.jpg');
    console.log('preloaded');
}

Game.create = function() {
    Game.playerMap = {};
    var background = game.add.tileSprite(0, 0, width, height, 'background');
    Client.askNewPlayer();
    console.log('created');
}

Game.update = function() {
    if (cursors.left.isDown) {
        Client.changeVelo([-150, 0]);
    } else if (cursors.right.isDown) {
        Client.changeVelo([150, 0]);
    } else if (cursors.up.isDown) {
        Client.changeVelo([0, -150]);
    } else if (cursors.down.isDown) {
        Client.changeVelo([0, 150]);
    }

    for (id in Game.playerMap) {
        Game.playerMap[id].body.velocity.x = 0;
        Game.playerMap[id].body.velocity.y = 0;
    }

}

Game.addNewPlayer = function(id,x,y,v){
    console.log(x, y, v);
    Game.playerMap[id] = game.add.sprite(x,y,'player');
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    Game.playerMap[id].body.velocity.x = v[0];
    Game.playerMap[id].body.velocity.y = v[1];
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.movePlayer = function(player){
    Game.playerMap[player.id].body.velocity.x = player.v[0];
    Game.playerMap[player.id].body.velocity.y = player.v[1];
}