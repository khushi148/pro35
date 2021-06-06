var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,height;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

   var balloonHeight =database.ref("balloon/height");
   balloonHeight.on("value",readheight,showError);
}

// function to display UI
function draw() {
  background(bg);

 
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    changePosition(-10,0);
  

    }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction'
    changePosition(+10,0);

  }
  else if(keyDown(UP_ARROW)){
    console.log("pressingUP_ARROW");
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    changePosition(0,-10);
    balloon.scale=balloon.scale-0.01;
   

  }
  else if(keyDown(DOWN_ARROW)){
  
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    changePosition(0,+10);
    balloon.scale=balloon.scale+0.01;
   
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}

function changePosition(x,y){
console.log("in changePositon");
  database.ref("balloon/height").set({
    'x': balloon.x + x ,
    'y': balloon.y + y
  })
}

function readheight(data){

  height= data.val();

  balloon.x= height.x;
  balloon.y= height.y;
}

function showError(){

  console.log(" Error ");
}
