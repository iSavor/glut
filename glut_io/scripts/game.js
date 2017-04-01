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
}

Game.addNewPlayer = function(id,x,y){
    console.log(x, y);
    Game.playerMap[id] = game.add.sprite(x,y,'player');
};