var points = [
    {x: 10, y: 20},
    {x: 20, y: 40},
    {x: 30, y: 20},
    {x: 40, y: 40},
    {x: 50, y: 60},
    {x: 60, y: 80},
];

var canvas = document.createElement('div');
canvas.style.height = 500+ 'px';
canvas.style.width = 500+ 'px';
canvas.style.border = 'thick solid #aaaaaa';
canvas.style.margin = '0 auto';
canvas.style.position = 'relative';
document.body.appendChild(canvas);

function Plot(x, y, container) {
    var self = this;
    this.x = x;
    this.y = y;
    this.container = container;

    this.dot = document.createElement('div');
    this.dot.style.borderRadius = '50%';
    this.dot.style.height = 10+'px';
    this.dot.style.width = 10+'px';
    this.dot.style.position = 'absolute';
    this.dot.style.top = (this.y*5)+'px';
    this.dot.style.left = (this.x*5)+'px';
    this.dot.style.backgroundColor = '#4399ca';
    this.dot.addEventListener('click', function(){
        self.setColor('#292');
      })

    this.setColor = function(color) {
        this.color = color;
        this.dot.style.backgroundColor = this.color;
    }
    this. render = function() {
        this.container.appendChild(this.dot);
    }
}
points.forEach(function(pnt){
    point = new Plot(pnt.x, pnt.y, canvas)
    point.render()
})

