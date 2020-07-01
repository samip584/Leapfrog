class Game{
  constructor(context){
    this.context = context;
    
    this.yOffset = -650;
    this.road = new Image;
    this.road.src = './images/road.png';

    this.speed = 10;
    
    this.userCar = new PlayerCar()

    this.traffic = [];
    this.trafficSpeed = 3;
    this.tick = 0;
    this._stopGame = false;
    this.spawnTime = 2000;

    this.bullet = new Bullet;
    this.bulletFire = false;
    
    setInterval(() => this.populateTraffic(), this.spawnTime);
  }

  
  update(){
     if(!this._stopGame){  
      if(this.yOffset >= 0){
        this.yOffset = -650;
      }
      this.context.drawImage(this.road, 0, this.yOffset, 450, 650);
      this.context.drawImage(this.road, 0, this.yOffset + 650, 450, 650);
      this.context.drawImage(this.road, 0, this.yOffset + 650*2, 450, 650);
      
      this.yOffset += this.speed;
      this.traffic.forEach(function(car){
        car.update(context)
        if (car.yPosition > 650){
          car.yPosition  = -150;
          car.carNo = Math.round(Math.random() * (car.opponenetCarImgs.length -1));
          car.lane = Math.round(Math.random() * 2);
          score += 1;
          scoreBoard.innerHTML = 'Score : ' + score;
          removeCar(car)
        }
      })

      if(collision(this.userCar, this.traffic).detected){
        this._stopGame = true;
        let tryAgainScreen = document.querySelector('.try-again');
        tryAgainScreen.style.display = 'block';
        let highScoreBoard = document.querySelector('.high-score');
        highScoreBoard.innerHTML = 'SCORE : ' + score;
        scoreBoard.style.display = 'none';
        energybar.style.display = 'none';
      }

     
      let bulletCollision = collision(this.bullet, this.traffic)
      if(bulletCollision.detected){
        bulletCollision.cars.forEach(function(car){
          game.traffic = game.traffic.filter(item => item !== car);
        });
        this.bullet.yPosition = -150;
      }

      this.tick += 1;
      if (this.tick > 600){
        this.tick = 0;
        this.speed += .25;
        this.trafficSpeed += .25;
        this.spawnTime -= 200;
        this.traffic.forEach(function(car){
          car.increaseSpeed()
        })
      }

      if(this.bulletFire){
        this.bullet.update(this.context);
      }

      this.userCar.update(this.context)
    }
  }
  populateTraffic(){
    var trafficCar = new Traffic(this.trafficSpeed);
    this.traffic.push(trafficCar)
    trafficCar = new Traffic(this.trafficSpeed);
    this.traffic.push(trafficCar)
  }
  
}


canvas=document.getElementById("canvas");
let context = canvas.getContext('2d');

let game = new Game(context)

let tryAgainScreen = document.querySelector('.try-again');
var scoreBoard = document.querySelector('.score-board');
let energybar = document.querySelector('.energy');
var charge = document.querySelector('.charge');
var score = 0;
let homeScreen = document.querySelector('.home-screen');
let playButton = document.querySelector('.play-button');

playButton.addEventListener('click', function(){
  homeScreen.style.display = 'none';
  requestAnimationFrame(gameLoop);
})
tryAgainButton = document.querySelector('.try-again-button');
tryAgainButton.addEventListener('click', function(){
  score = 0;
  scoreBoard.innerHTML = 'Score : ' + score;
  scoreBoard.style.display = 'block';
  energybar.style.display = 'block';
  game.traffic = [];
  game.userCar.resetPosition();
  game._stopGame = false;
  tryAgainScreen.style.display = 'none';
})


function collision(object, traffic){
  let collided ={detected : false, cars: []} 
  for(i = 0; i <traffic.length; i++){
    if (object.position.x < traffic[i].position.x + traffic[i].position.width &&
      object.position.x + object.position.width > traffic[i].position.x &&
      object.position.y < traffic[i].position.y + traffic[i].position.height &&
      object.position.y + object.position.height > traffic[i].position.y) {
        collided.detected = true;
        collided.cars.push(traffic[i]);
    }
  }
  return collided
}

function readyToFire(){
  game.bulletFire = false;
}
function addBlown(){
  if(game.blown){
    game.blown.yPosition = -150;
    game.blown.lane = Math.round(Math.random() * 2);
    game.traffic.push(game.blown);
    game.blown = null;
  }
}
function removeCar(car){
  game.traffic = game.traffic.filter(item => item !== car);
}

document.addEventListener('keydown', function(key){
  switch(key.keyCode){
    case 37: // left arrow key
      game.userCar.userCarLeft();
      break;
    case 39: //right arrow key
      game.userCar.userCarRight();
      break;
    case 32: //right arrow key
      if(!game.bulletFire) {
        game.bulletFire = true;
        game.bullet.yPosition = 450;
        game.bullet.xPosition = game.userCar.carPosition + 20;
      }
      break;

  }
})




scoreBoard.innerHTML = 'Score : ' + score;
function gameLoop(){
  game.update();
  requestAnimationFrame(gameLoop);
}