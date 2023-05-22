var trex, trex_running, trex_collided;
var chao, chaoimg;
var chaoinv;
var nuvem;
var imgNuvem;
var cactos; 
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var score = 0;
var inicio; 
var jogar = 1;
var fimdejogo = 0;
var estadojogo = jogar;
var cactosgroup, nuvensgroup;
var recomecarImagerecomecar;
var fimdejogoImage;
var trexcollided;
var sompulo, sommorrer, somcheckpoint;

function preload(){
  trex_running = loadAnimation("./images/trex1.png","./images/trex3.png","./images/trex4.png");
  chaoimg = loadImage("./images/ground2.png");
  imgNuvem = loadImage("./images/cloud.png");
  cacto1 = loadImage("./images/obstacle1.png");
  cacto2 = loadImage("./images/obstacle2.png");
  cacto3 = loadImage("./images/obstacle3.png");
  cacto4 = loadImage("./images/obstacle4.png");
  cacto5 = loadImage("./images/obstacle5.png");
  cacto6 = loadImage("./images/obstacle6.png");
  fimdejogoImage = loadImage("./images/gameOver.png");
  recomecarImage = loadImage("./images/restart.png");
  trexcollided = loadImage("./images/trex_collided.png");
  sompulo = loadSound("./souds/jump.mp3");
  sommorrer = loadSound("./souds/die.mp3");
  somcheckpoint = loadSound("./souds/checkpoint.mp3");
}

function setup(){
  createCanvas(600,200);
   trex = createSprite(50,140,20,50);
   trex.addAnimation("running", trex_running);
   chao = createSprite (300,170,600,20);
   chao.addImage(chaoimg);
   console.log(chao.x);
   chaoinv = createSprite(300,180,600,15);
   trex.scale = 0.6;
   fimdejogo = createSprite(300,100);
   fimdejogo.addImage(fimdejogoImage);
   recomecar = createSprite(300,140);
   recomecar.addImage(recomecarImage);
   recomecar.scale = 0.5;
   cactosgroup = createGroup();
   nuvensgroup = createGroup();
   trex.addAnimation("collided", trexcollided);
  
}


function draw(){
  background("white");
  textSize(13);
  if (estadojogo == jogar){
    chao.velocityX = -(3+2 * score/1000);
    score = score + Math.round(frameCount/60);
    if (score > 0 && score %500 == 0){
     somcheckpoint.play();
    }
    if (keyDown("space") && trex.y >= 141){
      trex.velocityY=-16 ;  
      sompulo.play()
     }
    trex.velocityY = trex.velocityY + 0.85;
    if (chao.x < 0){
    chao.x = chao.width/2;
   }
   fimdejogo.visible = false; 
   recomecar.visible = false;
   criarnuvens();
   criarcactos();
    if (cactosgroup.isTouching(trex)){
    estadojogo = fimdejogo ;
   }
   } else if (estadojogo === fimdejogo){
    fimdejogo.visible = true;
    recomecar.visible = true; 
    chao.velocityX = 0;
    trex.velocityY= 0;
    trex.changeAnimation("collided", trexcollided);
    cactosgroup.setVelocityXEach(0);
    nuvensgroup.setVelocityXEach(0);
    cactosgroup.setLifetimeEach(-1);
    nuvensgroup.setLifetimeEach(-1);
    if (mousePressedOver(recomecar)) {
      reset()
    }
    //  sommorrer.play(); 
   }
   
  text("Pontuação " + score, 20,20);
  chaoinv.visible = false;
  trex.collide(chaoinv);
  console.log(trex.y);
  drawSprites();
  
}

function criarcactos(){
  if (frameCount%100 === 0){
  cactos = createSprite(600,165,40,10);
  cactos.velocityX =  -(3+2 * score/1000);
  var cactosRandom  = Math.round(random(1,6));
  cactos.scale = 0.6;
  switch(cactosRandom){
    case 1: cactos.addImage(cacto1);
      break;
    case 2: cactos.addImage(cacto2);
      break;
    case 3: cactos.addImage(cacto3);
      break;
    case 4: cactos.addImage(cacto4);
      break; 
    case 5: cactos.addImage(cacto5);
      break;
    case 6: cactos.addImage(cacto6);
      break;
  }
     cactosgroup.add(cactos);
     cactos.lifetime = 200;
  //cacto1 = createEdgeSprites();
  //cacto2 = createEdgeSprites();
  //cacto3 = createEdgeSprites();
  //cacto4 = createEdgeSprites();
  //cacto5 = createEdgeSprites();
  //cacto6 = createEdgeSprites():
  }
  }
  

   function criarnuvens(){
   if (frameCount%60 === 0 ){
    nuvem = createSprite(600,100,40,10);
    nuvem.velocityX=  -(3+1  * score/1000);
    nuvem.addImage(imgNuvem);
    nuvem.scale = 0.6;
    nuvem.y = Math.round(random(10,100));
    console.log(nuvem.depth);
    trex.depth = trex.depth+1;
    nuvem.lifetime = 200;
    nuvensgroup.add(nuvem);
    
  } 
}
function reset() { 
 recomecar.visible = false;
 fimdejogo.visible = false; 
 estadojogo = jogar; 
 cactosgroup.destroyEach();
 nuvensgroup.destroyEach();
 trex.changeAnimation("running", trex_running);
 score = 0;
 fimdejogo.depth = nuvem.depth+1;
 chao.velocityX = 0;
 //cactos.velocityX = 0; 
 nuvem.velocity = 0;
}
