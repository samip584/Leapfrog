class Bird{
  constructor(){
    this.x = 33;
    this.y = 137;
    this.width = 34;
    this.height = 26;
    this.tick = 0;
    this.animationPositionList = [
      {sX: 276, sY: 112},
      {sX: 276, sY: 139},
      {sX: 276, sY: 164},
      {sX: 276, sY: 139}
    ]
    this.jumpHeight = 4;
    this.speed = 0;
    this.gravity = .2;
    this.radius = 12;
  }

  update(ctx){
    let bird = this.animationPositionList[this.tick];
    ctx.drawImage(sprite, bird.sX, bird.sY, this.width, this.height, this.x, this.y, this.width, this.height);
    if(game.state == 1){
      this.speed += this.gravity;
      this.y += this.speed;
    }


  }
  flap(){
    this.tick = (this.tick + 1) % this.animationPositionList.length;
  }
  jump(){
    this.speed = - this.jumpHeight;
  }
}