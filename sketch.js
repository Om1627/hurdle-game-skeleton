
var canvas, backgroundImage;
var engine,world;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database,hurdle;

var form, player, game;

var plrs, plr1, plr2, plr3, plr4;
var hurdles=[];



function preload(){

}

function setup(){

  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2){
    game.end();
  }

 

}
