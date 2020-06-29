class Ant{
  constructor(container){ 
    this.container = container;
    this.radius = 45;
    this.x = Math.floor(Math.random() * (600 - (2 * this.radius)));
    this.y = Math.floor(Math.random() * (600 - (2 * this.radius)));
    this.dy = Math.floor(Math.random() * 3)+1;
    this.dx = Math.floor(Math.random() * 3)+1;
    this.ant = document.createElement('div');
  }

  draw(){
    this.ant.style.position = 'absolute';
    this.ant.style.height = this.radius*2 + 'px';
    this.ant.style.width = this.radius*2 + 'px'; 
    this.ant.style.backgroundImage = 'url(images/ant1.png)';
    this.ant.style.bottom = this.y + 'px';
    this.ant.style.left = this.x + 'px';
    this.ant.style.backgroundRepeat = 'no-repeat';
    this.container.appendChild(this.ant);
    
  }

  

  handleBorderCollision = () => {
    if (this.x > (600 - this.radius*2)){
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

  get antDiv(){
    return this.ant;
  }

  setDirection(dxNew, dyNew){
    this.dx = dxNew;
    this.dy = dyNew;
  }
  increasepositon(){
    this.x += 1;
    this.y += 1;
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
    this.ant.style.bottom = this.y + 'px';
    this.ant.style.left = this.x + 'px';
  }
  face(){
    var deg = Math.atan(this.dx/this.dy) * (180 / Math.PI);
    if (this.dy < 0)
      deg = 180 + deg;
    this.ant.style.transform = 'rotate('+deg+'deg)';
  }

  antAnimate(tick){
    if (tick < 10){
      this.ant.style.backgroundImage = 'url(images/ant2.png)'
    }
    else{
      this.ant.style.backgroundImage = 'url(images/ant1.png)'
    }
  }
  
  
}




var box = document.querySelector(".box");
var ants = []
var antNo = 5;
var tick = 1;

function handleAntCollision(){
  for (i = 0; i < antNo; i++){
    for (j = i; j < antNo; j++){
      if (i !== j){
        if(detectCollision(ants[i].position, ants[j].position))
        {
          let tempI = ants[i].direction;
          let tempJ = ants[j].direction;
          ants[i].setDirection(tempJ[0], tempJ[1]);
          ants[j].setDirection(tempI[0], tempI[1]);
          
        }
      }
    }
  }
}


function detectCollision(circle1, circle2){
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius+2) {
      return(true)
  }
}

for (i = 0; i < antNo; i++){ 
  overlap = false;
  do{
    overlap = false;
    var ant =  new Ant(box, '#000');
    for (let j = 0; j < i; j++)
      if (detectCollision(ant, ants[j])){
        overlap = true;
        break;  
      }
  }while(overlap)
  ant.draw();
  addListener(ant)
  
  ants.push(ant);
}
function addListener(ant){
  ant.antDiv.addEventListener('click', function(){
    ant.antDiv.remove();
    ants = ants.filter(item => item !== ant);
    antNo -= 1;
  });
}


function run(){
  for (i = 0; i < antNo; i++){ 
    ants[i].handleBorderCollision();
    ants[i].move();
    ants[i].face();
    ants[i].antAnimate(tick);  
  }
  tick = (tick + 1)%20;
  handleAntCollision();
  window.requestAnimationFrame(run);
}
run();