class Circle{
  constructor(index, color, x, column){
    this.radius = 0;
    this.color = color;
    this.y = (11 - index) * 10;
    this.x = x;
    this.theta = (index+column)/10; 
  }
  
  changeSize(){
    this.theta = (this.theta + 0.02)%Math.PI;
    this.radius = Math.abs(Math.sin(this.theta) * 7);
  }
  update(ctx, y) {
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y + y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    this.changeSize();
  }
}
