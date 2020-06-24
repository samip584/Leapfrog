function canvas(width, height, bgColor, container) {
    var self = this;
    this.width = width;
    this.height = height;
    this.bgColor = bgColor;
    this.container = container;

    this.element = document.createElement('div');
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.border = 'thick solid #aaaaaa';
    this.element.style.margin = '20px 20px';
    this.element.style.position = 'relative';
    this.element.style.float = 'left';
    this.element.style.backgroundColor = this.bgColor;

    this.getCanvas = function() {
        return(this.element)
    }
    this.getHeight = function() {
        return(this.height)
    }
    this. render = function() {
        this.container.appendChild(this.element);
    }
}

function plotBall(radius, canvas, color, ppf) {
    var self = this;
    this.radius = radius;
    this.canvas = canvas;
    this.color = color;
    this.ppf = ppf;
    
    this.ball = document.createElement("div");
    this.ball.style.borderRadius = "50%";
    this.ball.style.height = (radius*2)+"px";
    this.ball.style.width = (radius*2)+"px";
    this.ball.style.backgroundColor = color;
    this.ball.style.position = "absolute";
    this.ball.style.bottom = 0;
    this.ball.style.left = 'calc(50% - '+radius+'px)';

    
    this.position = 0;
    this.up = true;
    this. render = function() {
        this.canvas.getCanvas().appendChild(this.ball);
    }
    this.move = function(){
        function step(){
            window.requestAnimationFrame(step);
            if (self.up)
            {
                self.position = self.position + self.ppf;
                if( self.position > self.canvas.getHeight() - (self.radius*2)){
                    self.up = false;
                }
            }
            else
            {
                self.position = self.position - self.ppf;
                if( self.position < 1){
                    self.up = true;
                }
            }
            self.ball.style.bottom = self.position+'px';
        }
        
        window.requestAnimationFrame(step);
    }
}

list = [
    {
        'canvasWidth' : 100,
        'canvasHeight' : 100,
        'canvasColor' : "#d57540",
        'radius' : 10,
        'ballColor' : '#6c0a63',
        'ppf' : 1 //pixel per frame
    },
    {
        'canvasWidth' : 400,
        'canvasHeight' : 500,
        'canvasColor' : "#e28e3b",
        'radius' : 30,
        'ballColor' : '#d94b83',
        'ppf' : 4
    },
    {
        'canvasWidth' : 200,
        'canvasHeight' : 300,
        'canvasColor' : "#2af54d",
        'radius' : 30,
        'ballColor' : '#5f167d',
        'ppf' : 4
    },
    {
        'canvasWidth' : 400,
        'canvasHeight' : 400,
        'canvasColor' : "#d1bca5",
        'radius' : 40,
        'ballColor' : '#3a8c91',
        'ppf' : 5
    },
    {
        'canvasWidth' : 300,
        'canvasHeight' : 400,
        'canvasColor' : "#a8eb1c",
        'radius' : 30,
        'ballColor' : '#c24c14',
        'ppf' : 3
    }
    
]

list.forEach(function(elem) {
    var box = new canvas(elem.canvasWidth, elem.canvasHeight, elem.canvasColor, document.body);
    box.render();
    var ball = new plotBall(elem.radius, box, elem.ballColor, elem.ppf);
    ball.render();
    ball.move()
});