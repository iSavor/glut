var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var game;
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
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

Game.preload = function() {
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.jpg');
    console.log('preloaded');
}

Game.create = function() {
    Game.playerMap = game.add.group();
    Game.playerMap.enableBody = true;
    Game.background = game.add.tileSprite(0, 0, width, height, 'background');
    Game.cursors = game.input.keyboard.createCursorKeys();
    Client.askNewPlayer();
    console.log('created');
}

Game.update = function() {
}

Game.addNewPlayer = function(id,x,y){
    console.log(x, y);
    Game.playerMap.create(x, y, 'player');
    player = Game.playerMap[id];
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};