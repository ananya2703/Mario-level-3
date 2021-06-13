
var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;

function preload(){
    mario_running = loadAnimation("images/mar1.png", "images/mar2.png", "images/mar3.png", "images/mar4.png", "images/mar5.png", "images/mar6.png", "images/mar7.png");
    bgImage = loadImage("images/bgnew.jpg");
    brickImage = loadImage("images/brick.png");
}

function setup() {
    createCanvas(1000,600);

    bg = createSprite(580,300);
    bg.addImage(bgImage);
    bg.scale = 0.5;
    bg.velocityX = -6;

    mario = createSprite(200,585,20,50);
    mario.addAnimation("running", mario_running);
    mario.scale = 0.3;

    ground = createSprite(200,585,400,10);

    ground.visible = false;

    bricksGroup = new Group();
    coinsGroup = new Group();
}

function draw() {

    if (bg.x < 100){
        bg.x=bg.width/4;
    }
    if(mario.x<200){
        mario.x=200;
    }
    if(mario.y<50) {
        mario.y=50;
    }
    if(keyDown("space")) {
        mario.velocityY = -16;
    }
    if(keyDown("down")) {
        mario.velocityY = 5;
    }
    if(keyDown("right")) {
        mario.velocityX = 5;
    }
    if(keyDown("left")) {
        mario.velocityX = -5;
    }


    mario.velocityY = mario.velocityY + 0.5;
    mario.collide(ground);

    generateBricks();
    for (var i = 0; i <(bricksGroup).length ; i++) {
        var temp = (bricksGroup).get(i);
    
        if (temp.isTouching(mario)) {
          mario.collide(temp);
        }
    }

    mario.collide(ground);

    generateCoins();
    for  (var i = 0; i < (coinsGroup).lenght; i++) {
        var temp=(coinsGroup).get(I);

        if(temp.isTouching(mario)) {
            coinSound.play();
            coinScore++;
            temp.destroy();
            temp=null;
        }
    }
    drawSprites();
    
    textSize(20);
    fill("brown")
    text("Coins Collected: "+ coinScore, 500,50);
}


function generateBricks() {
    if (frameCount % 70===0) {
      var brick = createSprite(1200,120,40,10);
      brick.y = random (50,450);
      brick.addImage(brickImage);
      brick.scale = 0.5;
      brick.velocityX = -5;
  
      brick.lifetime = 250;
      bricksGroup.add(brick);
    }
}


function generateCoins() {
    if (frameCount % 50===0) {
        var coin = createSprite(1200,120,40,10);
        coin.addAnimation("coin", coinImage);
        coin.y = Math.round(random(80,350)) ;
        coin.scale = 0.1;
        coin.velocityX = -3;
        coin.lifetime = 1200;
        coinsGroup.add(coin);
    }
}
