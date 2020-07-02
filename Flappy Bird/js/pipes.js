class Pipes{
  constructor(){
    this.bottomPipe = {
      sX : 502,
      sY : 0
    }
    this.topPipe = {
      sX : 553,
      sY : 0
    }
    this.width = 53;
    this.height = 400;
    this.gap = 85;
    this.dx = 2;

    this.position = [];
    this.maxYpos = -150;
    this.x = cnvWidth;
    this.y

  }

  update(ctx){
    for(let i  = 0; i < this.position.length; i++){
      let p = this.position[i];
      
      let topYPos = p.y;
      let bottomYPos = p.y + this.height + this.gap;
      
      game.checkPipeCollision()
      if(p.x < -this.width){
        this.position = this.position.filter(item => item !== p);
        score += 1;
      }
      else{
        ctx.drawImage(sprite, this.topPipe.sX, this.topPipe.sY, this.width, this.height, p.x, topYPos, this.width, this.height);  

        ctx.drawImage(sprite, this.bottomPipe.sX, this.bottomPipe.sY, this.width, this.height, p.x, bottomYPos, this.width, this.height);  
      }

      p.x -= this.dx;
    }
  }
  
  addPipes(){
    if(game.state == 1){
      this.position.push({x: this.x, y: this.y = this.maxYpos * (Math.random() + 1)});
    }
  }
}