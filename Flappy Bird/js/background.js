class Background{
  constructor(){
    this.color = '#70c5ce';
    this.sX =  0;
    this.sY = 0;
    this.width = 275;
    this.height = 226;
    this.x = 0;
    this.y = cnvHeight - this.height;
    
  }
  update(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, cnvWidth, cnvHeight);
    
    ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);    
    ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
    
  }
}