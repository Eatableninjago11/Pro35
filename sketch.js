
var ball;
var database,position
var ground,player;
function preload(){
  ground = loadImage("cityImage.png");
  player = loadImage("hotairballon1.png")
}
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.addImage(player)
    var locofchild=database.ref("ball/position");
    locofchild.on("value", readPosition, showError);
}

function draw(){
    background("white");
    
      if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
      }
      else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
      }
      else if(keyDown(UP_ARROW) && ball.y>20 ){
        writePosition(0,-1);
        ball.scale=ball.scale-0.01
      }
      else if(keyDown(DOWN_ARROW) && ball.y<699 ){
        writePosition(0,+1);
        ball.scale=ball.scale+0.01
      }
      drawSprites();
    
  }

function writePosition(x,y){
    database.ref("ball/position").set({
        x:ball.x + x ,
        y:ball.y + y
    })
    
}
function readPosition(data){
    console.log("error")
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}
function showError()
{
    console.log("error")
  }