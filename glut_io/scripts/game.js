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

Game.init = function() {
    //game.state.disableVisibilityChange = true;
    cursors = game.input.keyboard.createCursorKeys();
}

Game.preload = function() {
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.png');
    console.log('preloaded');
}

Game.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    Game.playerMap = {};
    var background = game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    Client.requestJoinGame();
    console.log('created');
}

Game.update = function() {
    Client.slowDown();

    if (!Game.local.actor)
    {
       return;
    }
    Game.local.actor.rotation = game.physics.arcade.angleToPointer(Game.local.actor);
    
    if (game.input.mousePointer.isDown) {
        var xaxis = game.input.x - Game.local.actor.body.position.x;
        var yaxis = game.input.y - Game.local.actor.body.position.y;
        var zaxis = Math.sqrt(Math.pow(xaxis, 2) + Math.pow(yaxis, 2));

        Client.changeVelo([xaxis/zaxis*20, yaxis/zaxis*20]);
    }

    
    if (Game.local.actor) {
        Client.broadcastSelfPos(Game.local.actor.body.position.x, Game.local.actor.body.position.y);
    }
}

Game.local = {
    actor: null,
    id: -1
};

Game.render = function(){
    if (!Game.local.actor)
    {
       return;
    }
      game.debug.spriteInfo(Game.local.actor, 32, 32);
}

Game.createSelfPlayer = function (id, x, y, v) {
    Game.local.actor = game.add.sprite(x, y, 'player');
    Game.local.id = id;
    Game.playerMap[id] = Game.local.actor;
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    Game.local.actor.body.velocity.x = v[0];
    Game.local.actor.body.velocity.y = v[1];
    Game.local.actor.body.collideWorldBounds = true;
    
    game.camera.follow(Game.local.actor);
    //Game.setCam(Game.local.actor);
    Game.local.actor.anchor.setTo(0.5, 0.5);
}

Game.addNewPlayer = function(id, x, y, v) {
    Game.playerMap[id] = game.add.sprite(x, y, 'player');
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    Game.playerMap[id].body.velocity.x = v[0];
    Game.playerMap[id].body.velocity.y = v[1];
    Game.playerMap[id].body.collideWorldBounds = true;
};

Game.setCam = function(actor){
    game.camera.follow(actor);
}

Game.removePlayer = function(id) {
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.moveSelfPlayer = function(player) {
    if (!(player.id in Game.playerMap)) {
        return;
    }
    Game.playerMap[player.id].body.velocity.x = player.v[0];
    Game.playerMap[player.id].body.velocity.y = player.v[1];
}

Game.moveOtherPlayer = function(player) {
    if (! Game.playerMap) {
        return;
    }
    if (!(player.id in Game.playerMap)) {
        return;
    }
    debugger;
    Game.playerMap[player.id].x = player.x;
    Game.playerMap[player.id].y = player.y;
}
