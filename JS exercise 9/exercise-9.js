var canvas = document.createElement("div");
canvas.style.height = 500+ "px";
canvas.style.width = 500+ "px";
canvas.style.border = "thick solid #aaaaaa";
canvas.style.margin = "0 auto";
canvas.style.position = "relative";
canvas.style.marginTop = 50+"px";
document.body.appendChild(canvas)

var ball = document.createElement("div");
ball.style.borderRadius = "50%";
ball.style.height = 100+"px";
ball.style.width = 100+"px";
ball.style.backgroundColor = "#4399ca";
ball.style.position = "absolute";
ball.style.bottom = 0;
ball.style.left = "calc(50% - 50px)";
canvas.appendChild(ball);


var i = 0;
var start;
var up = true;
var progress = 0;
function step(timestamp){
    if (up)
    {
        progress = progress + 5;
        if( progress > 400){
            up = false;
        }
    }
    else
    {
        progress = progress - 5;
        if( progress < 1){
            up = true;
        }
    }
    ball.style.bottom = progress+"px";
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step)