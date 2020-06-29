class Ball{
  constructor(container, color){ 
    this.container = container;
    this.radius = Math.floor(Math.random() * 20) + 20;
    this.x = Math.floor(Math.random() * (1000 - (2 * this.radius)));
    this.y = Math.floor(Math.random() * (600 - (2 * this.radius)));
    this.dy = Math.floor(Math.random() * 10)+1;
    this.dx = Math.floor(Math.random() * 10)+1;
    this.color = color;
    this.ball = document.createElement('div');
  }

  draw(){
    this.ball.style.position = 'absolute';
    this.ball.style.height = this.radius*2 + 'px';
    this.ball.style.width = this.radius*2 + 'px'; 
    this.ball.style.backgroundColor = this.color;
    this.ball.style.borderRadius = '50%';
    this.ball.style.bottom = this.y + 'px';
    this.ball.style.left = this.x + 'px';
    this.container.appendChild(this.ball);
  }

  handleBorderCollision = () => {
    if (this.x > (1000 - this.radius*2)){
      this.dx = -Math.abs(this.dx);
    }
    if (this.x < 0){
      this.dx = Math.abs(this.dx);
    }
    if (this.y > (600 - this.radius*2)){
      this.dy = -Math.abs(this.dy);
    }
    if (this.y < 0){
      this.dy = Math.abs(this.dy);
    }
    
  }
  setDirection(dxNew, dyNew){
    this.dx = dxNew;
    this.dy = dyNew;
  }
  get direction(){
    return [this.dx, this.dy];
  }
  get position(){
    return {radius: this.radius, x: this.x, y: this.y};
  }

  move = () => {
    this.x += this.dx;
    this.y += this.dy;
    this.ball.style.bottom = this.y + 'px';
    this.ball.style.left = this.x + 'px';
  }

  
  
}

var box = document.querySelector(".box");
// var ball =  new Ball(box, genrateColor());
// ball.draw();
// ball.move();
var balls = []
var ballNo = 10 ;

function genrateColor(){
  color = '#';
  for (let i= 0; i < 6; i++)
    color = color + Math.floor(Math.random() * 10);
  return(color)
}

function handleBallCollision(){
  for (i = 0; i < ballNo; i++){
    for (j = i; j < ballNo; j++){
      if (i !== j){
        if(detectCollision(balls[i].position, balls[j].position)){
          let tempI = balls[i].direction;
          let tempJ = balls[j].direction;
          balls[i].setDirection(tempJ[0], tempJ[1]);
          balls[j].setDirection(tempI[0], tempI[1]);
        }
      }
    }
  }
}

function detectCollision(circle1, circle2){

  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
      console.log("collision detected!")
      return(true)
  }
}

for (i = 0; i < ballNo; i++){ 
  var ball =  new Ball(box, genrateColor());
  ball.draw();
  balls.push(ball);
}
function run(){
  for (i = 0; i < ballNo; i++){ 
    balls[i].handleBorderCollision();
    balls[i].move();
  }
  handleBallCollision();
  window.requestAnimationFrame(run);
}
run();