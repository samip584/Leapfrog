class Traffic{
  constructor(speed){
    this.car = new Image;
    this.opponenetCarImgs = ['./images/carBlue.png','./images/carGreen.png','./images/carOrenge.png','./images/carRed.png'];
    this.carNo = Math.round(Math.random() * (this.opponenetCarImgs.length-1));
    this.lane = Math.round(Math.random() * 2);
    this.yPosition = -150;
    this.speed = speed;
  }
  update(ctx){
    this.car.src = this.opponenetCarImgs[this.carNo];
    ctx.drawImage(this.car, this.lane * 90 + 100, this.yPosition, 70, 150);
    this.yPosition += this.speed;
    
    
  }
  get position(){ 
    return {x: this.lane * 90 + 100, y: this.yPosition, width: 70, height: 150}
  }
  increaseSpeed(){
    this.speed += .25;
  }
}