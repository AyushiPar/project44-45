
var gameState = 0;
var tree,tree1,tree2,treeImg;
var jaguar1,jaguar2,jaguar3,jaguar4;
var jaguarImg, tiger1Img, tiger2Img,jaguar2Img;
var edges;
var bgJungle;
var arrowIMG, arrow1, arrow2, arrow3, arrow4, arrow5;
var player,playerImgFront,playerImgBack;
var arrowCount = 0;
var lifeCount = 5;

function preload(){
  treeImg=loadImage("tree.png"); 
  jaguarImg=loadImage("jaguar.png");
  tiger1Img = loadImage("tiger.png");
  tiger2Img = loadImage("t1.png");
  jaguar2Img = loadImage("jaguar sitting.png");
  bgJungle = loadImage("toptree.png");
  arrowIMG = loadImage("arrow.png");
  playerImgFront = loadImage("playerFront.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-111);
  
  //Adding Trees
  tree=createSprite(displayWidth-250, displayHeight/2, 50,50);
  tree.addImage(treeImg);
  tree.scale=0.5;
  
  tree1=createSprite(230, displayHeight-250, 50,50);
  tree1.addImage(treeImg);
  tree1.scale=0.5;

  tree2=createSprite(displayWidth/3+200, displayHeight/4, 50,50);
  tree2.addImage(treeImg);
  tree2.scale=0.5;

  //Adding Jaguar
  jaguar1=createSprite(displayWidth-100,100,50,50);
  jaguar1.addImage(jaguarImg);
  jaguar1.scale=0.3
  jaguar1.velocityX= Math.round(random(-3,3));
  jaguar1.velocityY= Math.round(random(-3,3));

  jaguar2=createSprite(100,displayHeight-200,50,50);
  jaguar2.addImage(tiger1Img);
  jaguar2.scale=0.2
  jaguar2.velocityX= Math.round(random(-3,3));
  jaguar2.velocityY= Math.round(random(-3,3));

  jaguar3=createSprite(displayWidth/3+200,displayHeight-180,50,50);
  jaguar3.addImage(tiger2Img);
  jaguar3.scale=0.35;

  jaguar4=createSprite(100,150,50,50);
  jaguar4.addImage(jaguar2Img);
  jaguar4.scale=0.3;

  //adding arrows
  arrow1 = createSprite(displayWidth-100,displayHeight/2,50,50);
  arrow1.addImage(arrowIMG);
  arrow1.scale=0.08;
  
  arrow2 = createSprite(displayWidth-100,50,50,50);
  arrow2.addImage(arrowIMG);
  arrow2.scale=0.08;

  arrow3 = createSprite(displayWidth/4,displayHeight/4,50,50);
  arrow3.addImage(arrowIMG);
  arrow3.scale=0.08;

  arrow4 = createSprite(100,displayHeight/2,50,50);
  arrow4.addImage(arrowIMG);
  arrow4.scale=0.08;
  
  arrow5 = createSprite(displayWidth/4+100,displayHeight-180,50,50);
  arrow5.addImage(arrowIMG);
  arrow5.scale=0.08;

  //adding player-girl
  player=createSprite(displayWidth/2,displayHeight/2,50,50);
  player.addImage(playerImgFront);
  player.scale=1.5;

  //setting colliders
  tree1.setCollider("circle",0,0,300);
  tree.setCollider("circle",0,0,300);
  tree2.setCollider("circle",0,0,300);

  jaguar1.setCollider("rectangle",0,0,400,395);
  jaguar2.setCollider("rectangle",0,0,650,400);
  jaguar3.setCollider("rectangle",0,0,500,350);
  jaguar4.setCollider("circle",-10,-20,200);
  //jaguar4.debug=true;

  player.setCollider("rectangle", 0, 0, 40,100);

  edges=createEdgeSprites();
}

function draw() {
  if(gameState===0){
    background("black");
  }

 
  if(keyDown("space")){
    gameState=1;
  }
  if(gameState===1){
    
    //moving player
    if(keyDown("up")){
      //player.y=player.y-3;
      player.velocityY=-5;
      player.velocityX=0;
    }
    if(keyDown("down")){
      //player.y=player.y+3;
      player.velocityY=5;
      player.velocityX=0;
    }
    if(keyDown("right")){
      //player.x=player.x +3;
      player.velocityY=0;
      player.velocityX=5;
    }
    if(keyDown("left")){
      //player.x=player.x-3;
      player.velocityY=0;
      player.velocityX=-5;
    }

    // Collecting Arrows
    if(player.isTouching(arrow1)){
      arrow1.destroy();
      arrowCount++;
    }
    if(player.isTouching(arrow2)){
      arrow2.destroy();
      arrowCount++;
    }
    if(player.isTouching(arrow3)){
      arrow3.destroy();
      arrowCount++;
    }
    if(player.isTouching(arrow4)){
      arrow4.destroy();
      arrowCount++;
    }
    if(player.isTouching(arrow5)){
      arrow5.destroy();
      arrowCount++;
    }
    
    if(player.isTouching(jaguar1) || player.isTouching(jaguar2) || player.isTouching(jaguar3)
    || player.isTouching(jaguar4)){
      lifeCount=lifeCount-1;
    }

    if(arrowCount===5){
      gameState=2;
    }
    console.log(arrowCount);
    console.log(lifeCount);

    //jaguars bouncing off
    jaguar1.bounceOff(edges[0]);
    jaguar1.bounceOff(edges[1]);  
    jaguar1.bounceOff(edges[2]);
    jaguar1.bounceOff(edges[3]);  
    jaguar1.bounceOff(tree);
    jaguar1.bounceOff(tree1);
    jaguar1.bounceOff(tree2);

    jaguar2.bounceOff(edges[0]);
    jaguar2.bounceOff(edges[1]);  
    jaguar2.bounceOff(edges[2]);
    jaguar2.bounceOff(edges[3]);  
    jaguar2.bounceOff(tree);
    jaguar2.bounceOff(tree1);
    jaguar2.bounceOff(tree2);
    
    player.bounceOff(jaguar1);
    player.bounceOff(jaguar2);
    player.bounceOff(jaguar3);
    player.bounceOff(jaguar4);
    player.collide(edges);

    
    //background
    background("green");
    imageMode(CENTER)
    image(bgJungle,displayWidth/2,displayHeight/2,displayWidth,displayHeight);

    // player colliding
    player.collide(tree);
    player.collide(tree1);
    player.collide(tree2);
    
    drawSprites();
  }
  if(gameState===2){
    background("lightblue");
  }
}