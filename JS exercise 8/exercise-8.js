var points = [
    {x: 10, y: 20},
    {x: 20, y: 40},
    {x: 30, y: 20},
    {x: 40, y: 40},
    {x: 50, y: 60},
    {x: 60, y: 80},
];

var canvas = document.createElement("div");
canvas.style.height = 500+ "px";
canvas.style.width = 500+ "px";
canvas.style.border = "thick solid #aaaaaa";
canvas.style.margin = "0 auto";
canvas.style.position = "relative";
document.body.appendChild(canvas);

points.forEach(function(point){
    var dot = document.createElement("div");
    dot.style.borderRadius = "50%";
    dot.style.height = 10+"px";
    dot.style.width = 10+"px";
    dot.style.backgroundColor = "#4399ca";
    dot.style.position = "absolute";
    dot.style.top = (point.y*5)+"px";
    dot.style.left = (point.x*5)+"px";
    canvas.appendChild(dot);
    
})

