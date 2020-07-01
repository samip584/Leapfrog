class Bullet{
  constructor(){
    this.xPosition;
    this.speed = 15;
    this.bullet = new Image;
    this.bullet.src = './images/bullet.png'
    this.yPosition = 450;
    this.tick = 0;
  }
  
  update(ctx){
    ctx.drawImage(this.bullet, this.xPosition, this.yPosition, 20, 34);
    this.yPosition -= this.speed;
    this.tick += 1;
    charge.style.width = ((this.tick/200)*100) + '%';
    if(this.tick > 200){
      this.yPosition = 850;
      this.tick = 0;
      readyToFire();
    }
  }
  get position(){
    return {x: this.xPosition, y: this.yPosition, width: 20, height: 34};
  }
}