class Game{
  constructor(context){
    this.context = context;
    
    this.yOffset = -650;
    this.road = new Image;
    this.road.src = './images/road.png';

    this.speed = 10;
    
    this.userCar = new PlayerCar()

    this.traffic = [];
    this.tick = 0;
    this._stopGame = false;
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
      })
      if(collision(this.userCar, this.traffic)){
        this._stopGame = true;
        let tryAgainScreen = document.querySelector('.try-again');
        tryAgainScreen.style.display = 'block';
        let highScoreBoard = document.querySelector('.high-score');
        highScoreBoard.innerHTML = 'SCORE : ' + score;
        scoreBoard.style.display = 'none';
      }
      this.tick += 1;
      if (this.tick > 600){
        this.tick = 0;
        this.speed += 1;
        this.traffic.forEach(function(car){
          car.increaseSpeed()
        })
      }

      this.userCar.update(this.context)
    }
  }
  populateTraffic(){
    var trafficCar = new Traffic();
    this.traffic.push(trafficCar)
    trafficCar = new Traffic();
    this.traffic.push(trafficCar)
  }
}


canvas=document.getElementById("canvas");
let context = canvas.getContext('2d');

let game = new Game(context)


var scoreBoard = document.querySelector('.score-board');
var score = 0;



tryAgainButton = document.querySelector('.try-again-button');
tryAgainButton.addEventListener('click', function(){
  score = 0;
  scoreBoard.innerHTML = 'Score : ' + score;
  scoreBoard.style.display = 'block';
  game.traffic = [];
  game.userCar.resetPosition();
  game._stopGame = false;
  addTraffic()
  let tryAgainScreen = document.querySelector('.try-again');
  tryAgainScreen.style.display = 'none';
})


function collision(player, traffic){
  for(i = 0; i <traffic.length; i++){
    if (player.position < traffic[i].position.x + 70 &&
      player.position + 70 > traffic[i].position.x &&
      450 < traffic[i].position.y + 150 &&
      450 + 150 > traffic[i].position.y) {
        return(true);
    }
  }
  return(false)
}




document.addEventListener('keydown', function(key){
  console.log(key.keyCode)
  switch(key.keyCode){
    case 37: // left arrow key
      game.userCar.userCarLeft();
      break;
    case 39: //right arrow key
      game.userCar.userCarRight();
      break;
    

  }
})
function addTraffic(){ 
  game.populateTraffic();
  secondRow = setInterval(function(){
    game.populateTraffic();
    clearInterval(secondRow);
  }, 2300);
}


scoreBoard.innerHTML = 'Score : ' + score;
addTraffic();

function gameLoop(){
  game.update();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);