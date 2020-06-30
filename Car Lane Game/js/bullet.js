class Bullet{
  constructor(){
    this.xPosition;
    this.speed = 10;
    this.bullet = new Image;
    this.bullet.src = './images/bullet.png'
    this.yPosition = 450;
    this.tick = 0;
  }
  
  update(ctx){
    ctx.drawImage(this.bullet, this.xPosition, this.yPosition, 20, 34);
    this.yPosition -= this.speed;
    this.tick += 1;
    if(this.tick > 120){
      this.yPosition = 450;
      this.tick = 0;
      readyToFire();
    }
  }
  get position(){
    return {x: this.xPosition, y: this.yPosition, width: 20, height: 34};
  }
}