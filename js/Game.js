class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    plr1 = createSprite(100,100,20,50);
    

    plr2 = createSprite(100,200,20,50);
    

    plr3 = createSprite(100,300,20,50);
    

    plr4 = createSprite(100,400,20,50);
   

    plrs = [plr1, plr2, plr3, plr4];

    for (var y=165;y<565;y=y+100){

    for (var i=1000;i<3900;i=i+250){
     hurdles.push( new Hurdle(i,y))
    
    }}
    for (var i=0;i<hurdles.length;i++){
      hurdles[i].display();
    }
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(255);
     
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y= 50;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 100;
        //use data form the database to display the cars in y direction
        x = displayHeight + allPlayers[plr].distance;
        plrs[index-1].x = x;
        plrs[index-1].y = y;

        if (index === player.index){
       
          plrs[index - 1].shapeColor = "red";
          camera.position.x=displayHeight+allPlayers[plr].distance;
       camera.position.y=y;
        }
      
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    
    if (player.distance>3900){
      gameState=2;
    }
    }

    

    drawSprites();
  }
  end(){
    console.log("game ended");
    game.update(2);
    
  }
}
