class PlayerCar{
  constructor(){
    this.userCar = new Image;
    this.userCar.src = './images/userCar.png'
    this.carPosition = 190;
    
  }
  update(ctx){
    ctx.drawImage(this.userCar, this.carPosition, 450, 70, 150);
  }
  userCarLeft(){
    if (this.carPosition >100)
      this.carPosition -= 90;
  }
  userCarRight(){
    if (this.carPosition < 280)
      this.carPosition += 90;
  }
  
  get position(){
    return {x: this.carPosition, y: 450, width: 70, height: 150};
  }
  resetPosition(){
    this.carPosition = 190;
  }
}