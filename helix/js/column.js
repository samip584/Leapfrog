class Column{
  constructor(index){
    this.index = index;
    this.circles = [];
    this.x = 250 - (index % 15) * 15;
    this.colors = COLORS;
    this.theta = (index/30) *Math.PI;
    this.y = 0;
    
    for (var i = 0; i < 11; i++) {
      this.circles.push(new Circle(i, COLORS[10-i], this.x, this.index))
    }
  }

  changePosition(){
    this.theta = (this.theta + 0.02)%(Math.PI);
    this.y = Math.abs(Math.sin(this.theta)) * 50;
  }

  update(ctx){
    for (var i = 0; i < 11; i++) {
      this.circles[i].update(ctx, 30 + this.y);
    }
    this.changePosition();
  }
}
