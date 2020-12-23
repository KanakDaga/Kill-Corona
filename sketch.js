var gun, gunImg;
var bullet, bulletImg;
var gameOver, gameOverImg;
var restart, restartImg;
var covid, covidImg, covidGroup;
var human, humanImg, humanGroup;
var battleField, battleFieldImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  gunImg = loadImage("gun.png");
  bulletImg = loadImage("bullet.png");
  covidImg = loadImage("corona.png");
  humanImg = loadImage("human.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("reset.png");
  battleFieldImg = loadImage("battle ground...jpg");
}
function setup(){
  createCanvas(500,400);
  
  bulletGroup = new Group();
  
  battleField = createSprite(250,200,100,100);
  battleField.addImage(battleFieldImg);
  battleField.scale = 2.5
  
  gun = createSprite(60,200,30,30);
  gun.scale = 0.4;
  gun.addImage(gunImg);
  
  gameOver = createSprite(250,180,50,50);
  gameOver.scale = 0.5;
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(250,240,30,30);
  restart.scale = 0.4;
  restart.addImage(restartImg);
  restart.visible = false;
  
  covidGroup = new Group();
  humanGroup = new Group();
}
function draw(){
  background(220);
  
if(gameState === PLAY){
  gun.y = mouseY;
  
  spawnCorona();
  spawnHuman();
  
  if(keyDown("space")){
    bullets();
  }
  if(bulletGroup.isTouching(covidGroup)){
    covidGroup.destroyEach();
    score = score+2;
  }
  if(bulletGroup.isTouching(humanGroup)){
    gameState = END; 
  }
}
  if(gameState === END){
    gun.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    humanGroup.destroyEach();
    if(mousePressedOver(restart)){
      gameState = PLAY;
      reset();
    }
  }
  
  drawSprites();
  
  fill("black");
  text("Score : "+score,430,30);
}
function spawnCorona(){
  if(frameCount%100 === 0){
    var covid = createSprite(450,200,50,50);
    covid.scale = 0.2;
    covid.y = Math.round(random(50,300))
    covid.velocityX = -7;
    covid.addImage(covidImg);
    
    covid.lifetime = 100;
    covidGroup.add(covid);
  }
} 
function spawnHuman(){
  if(frameCount%150 === 0){
    var human = createSprite(450,300,50,50);
    human.scale = 0.2;
    human.addImage(humanImg);
    human.y = Math.round(random(30,350));
    human.velocityX = -5;
    
    human.lifetime = 100;
    humanGroup.add(human);
  }
}
function bullets(){
  var bullet = createSprite(130,200,20,20);
  bullet.scale = 0.12;
  bullet.addImage(bulletImg);
  bullet.y = gun.y;
  bullet.visible = false;
  bullet.visible = true;
  bullet.velocityX = 10;
  
  bulletGroup.add(bullet);
}
function reset(){
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  gun.visible = true;
}