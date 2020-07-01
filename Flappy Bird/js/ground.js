class Ground{
  constructor(){
    this.sX= 276;
    this.sY= 0;
    this.width= 224;
    this.height= 112;
    this.x= 0;
    this.y= cnvHeight - this.height;
    this.dx = 2;
  }
  update(ctx){
    ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
    ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
    if(game.state === 1){
      this.x = (this.x - this.dx) % (this.width/2);
    }
  }
}