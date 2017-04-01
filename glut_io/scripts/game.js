var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var game;
var Game = {};

function login() {
    gameInit();
}

function gameInit() {
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    game.state.add('Game', Game);
    game.state.start('Game');
}

Game.init = function(){
    game.state.disableVisibilityChange = true;
}

function preload() {
    console.log('preloaded');
}

function create() {
    console.log('created');
}

function update() {
}