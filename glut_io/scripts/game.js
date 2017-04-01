var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var game;
var Game = {};

function login() {
    gameInit();
}

function gameInit() {
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    //game.state.add('Game', Game);
    //game.state.start('Game');
}

/*
Game.init = function(){
    game.state.disableVisibilityChange = true;
}

Game.create = function(){
    Game.playerMap = {};
}
*/

function preload() {
    game.load.image('background', 'assets/background.png');
    console.log('preloaded');
}

function create() {
    var background = game.add.tileSprite(0, 0, width, height, 'background');
    console.log('created');
}

function update() {
}