class Game{
  constructor(context){
    this.context = context;
    this.background = new Background();
    this.ground = new Ground();
    this.tick = 0;
    this.bird = new Bird()
    this.state = 0;
    this.pipes = new Pipes()
  }

  
  update(){
    if(game.state <2){
      
      this.checkGroundCollision();
      this.tick += 1;
      this.background.update(this.context);
      if (this.tick % 5 == 0)
        this.bird.flap();
      if (this.tick % 100 == 0)
        this.pipes.addPipes()
      this.pipes.update(this.context);
      this.ground.update(this.context);
      this.bird.update(this.context);
      this.displayScore()
    }
  }

  getReady(){
    if (this.state === 0){
      let position = {sX : 0,
                  sY : 228,
                  w : 173,
                  h : 152,
                  x : cnvWidth/2 - 173/2,
                  y : 80}
      this.context.drawImage(sprite, position.sX, position.sY, position.w, position.h, position.x, position.y, position.w, position.h);
    }
  }
  gameOver(){
    if(score > highScore){
      highScore = score;
      localStorage.setItem('highScore', highScore)
    }
    if(this.state === 2){ 
      let position = {sX : 175,
        sY : 228,
        w : 225,
        h : 202,
        x : cnvWidth/2 - 225/2,
        y : 90}
      this.context.drawImage(sprite, position.sX, position.sY, position.w, position.h, position.x, position.y, position.w, position.h);
      this.context.fillStyle = "#FFF";
      this.context.strokeStyle = "#000";
      this.context.font = "25px Arimo";
      this.context.fillText(score, 225, 185);
      this.context.strokeText(score, 225, 185);
      this.context.fillText(highScore, 225, 228);
      this.context.strokeText(highScore, 225, 228);
    }
  }

  displayScore(){
    this.context.fillStyle = "#FFF";
    this.context.strokeStyle = "#000";
    this.context.font = "35px Arimo";
    this.context.lineWidth = 1;
    this.context.fillText(score, cnvWidth/2, 50);
    this.context.strokeText(score, cnvWidth/2, 50);
  }
  checkGroundCollision(){
    if (this.bird.y+ this.bird.height>this.ground.y){
      this.bird.y = cnvHeight - this.ground.height - this.bird.height;
      game.state = 2
    }
  }

  checkPipeCollision(){
    for(let i = 0; i < this.pipes.position.length; i++){
      let p = this.pipes.position[i];
      let bottomPipeYPos = p.y + this.pipes.height + this.pipes.gap;
      if(this.bird.x + 2 * this.bird.radius > p.x 
        && this.bird.x < p.x + this.pipes.width 
        && this.bird.y + 2 * this.bird.radius > p.y 
        && this.bird.y < p.y + this.pipes.height){
        this.state = 2;
        console.log('dead by top')
      }
      if(this.bird.x + 2 * this.bird.radius > p.x 
        && this.bird.x < p.x + this.pipes.width 
        && this.bird.y + 2 * this.bird.radius > bottomPipeYPos
        && this.bird.y< bottomPipeYPos + this.pipes.height){
          this.state = 2;
        console.log('dead by bottom')
      }
    }
  }
}

game = new Game(context)
function gameLoop(){
  game.update()
  game.getReady()
  game.gameOver()

  requestAnimationFrame(gameLoop);
}

gameLoop()