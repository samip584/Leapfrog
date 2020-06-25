function carousel(){
  var self = this;
  this.position = 0;
  this.oldPosition = 0;
  
  this.container = document.querySelector(".carousel-container");
  this.wrapper = document.querySelector(".carousel-image-wrapper");
  this.images = this.wrapper.getElementsByTagName("img");

  this.velocity = self.container.clientWidth/20;

  this.container.style.overflow ="hidden";
  this.container.style.position ="relative";

  this.wrapper.style.width = this.container.clientWidth * this.images.length +'px';
  this.wrapper.style.height = 100+'%';
  this.wrapper.style.position = 'absolute';
  this.wrapper.style.left = 0;

  this.leftButton = document.createElement('div');
  this.leftButton.style.position = 'absolute';
  this.leftButton.style.left = 0;
  this.leftButton.style.zIndex = '30';
  this.leftButton.style.width = '15%';
  this.leftButton.style.height= '100%';
  this.container.appendChild(this.leftButton);
  this.leftButton.addEventListener("mouseover", function(){
    self.hover(self.leftButton)
  });
  this.leftButton.addEventListener("mouseout", function(){
    self.notHover(self.leftButton)
  });
  this.leftButton.addEventListener("click", function(){
    console.log("ok")
    self.goLeft()
  });
  this.leftButtonImg = document.createElement('img');
  this.leftButtonImg.src = 'images/left.svg';
  this.leftButtonImg.style.width = '50%';
  this.leftButtonImg.style.position = "absolute";
  this.leftButtonImg.style.top = '50%';
  this.leftButtonImg.style.left = '25%';
  this.leftButton.appendChild(this.leftButtonImg);

  this.rightButton = document.createElement('div');
  this.rightButton.style.position = 'absolute';
  this.rightButton.style.right = 0;
  this.rightButton.style.zIndex = '30';
  this.rightButton.style.width = '15%';
  this.rightButton.style.height= '100%';
  this.container.appendChild(this.rightButton);
  this.rightButton.addEventListener("mouseover", function(){
    self.hover(self.rightButton);
  });
  this.rightButton.addEventListener("mouseout", function(){
    self.notHover(self.rightButton);
  });
  this.rightButton.addEventListener("click", function(){
    self.goRight();
  });
  this.rightButtonImg = document.createElement('img');
  this.rightButtonImg.src = 'images/right.svg';
  this.rightButtonImg.style.width = '50%';
  this.rightButtonImg.style.position = "absolute";
  this.rightButtonImg.style.top = '50%';
  this.rightButtonImg.style.left = '25%';
  this.rightButton.appendChild(this.rightButtonImg);



  for (i=0; i<this.images.length; i++){
    this.images[i].style.width = this.container.clientWidth+'px';
    this.images[i].style.float = 'left';
  }

  this.paginationContainer = document.createElement('div');
  this.paginationContainer.style.position = "absolute";
  this.paginationContainer.style.bottom = 0;
  this.paginationContainer.style.height = '7%';
  this.container.appendChild(this.paginationContainer);
  

  for (var i=0; i<this.images.length; i++){
    this.paginationbutton = document.createElement('div');
    this.paginationbutton.style.float = 'left';
    this.paginationbutton.style.borderRadius = '50%';
    this.paginationbutton.style.height = '15px';
    this.paginationbutton.style.width = '15px';
    this.paginationbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    this.paginationbutton.style.margin = '2px';
    this.paginationbutton.addEventListener('click', function(){
      self.goTo(i);
    });
    this.paginationbutton.addEventListener("mouseover", function(){
      self.pageigationHover(self.paginationbutton);
    });
    this.paginationbutton.addEventListener("mouseout", function(){
      self.notPageigationHover(self.paginationbutton);
    });
    this.paginationContainer.appendChild(this.paginationbutton);
  }
  
  this.paginationContainer.style.left = 'calc(50% - '+(this.paginationContainer.clientWidth / 2)+'px)';


  this.goRight = function(){
    self.oldPosition = self.position;
    self.position = (self.position - self.container.clientWidth)%self.wrapper.clientWidth;
    self.changeAnimation();
  }

  this.goLeft = function(){
    self.oldPosition = self.position;
    self.position = self.position + self.container.clientWidth;
    if (self.position > 0){
      self.position = -(self.wrapper.clientWidth - self.container.clientWidth);
    }
    self.changeAnimation();
  }

  this.goTo = function(page){
    self.position = -page * self.container.clientWidth;
    console.log(self.position)
    self.wrapper.style.left = self.position+'px';
  }


  this.hover = function(directionalDiv){
    directionalDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    directionalDiv.style.cursor = 'pointer';
  }

  this.notHover = function(directionalDiv){
    directionalDiv.style.backgroundColor = 'transparent';
  }

  this.pageigationHover = function(paginationbutton){
    paginationbutton.style.backgroundColor = 'rgb(255, 255, 255)';
    paginationbutton.style.cursor = 'pointer';
  }

  this.notPageigationHover = function(paginationbutton){
    paginationbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  }

  this.changeAnimation = function(){
    
    self.velocity = self.container.clientWidth/20;
    if (Math.abs(self.oldPosition - self.position)>self.container.clientWidth)
      self.velocity = self.velocity*3;
    function move(timestamp){
      console.log(self.velocity)
      if (Math.abs(self.oldPosition - self.position)<self.velocity){
        self.wrapper.style.left = self.position+'px';
        self.oldPosition = self.position;
      }
      else if (self.oldPosition > self.position)
        self.oldPosition = self.oldPosition - self.velocity;
      else
        self.oldPosition = self.oldPosition + self.velocity;
      self.wrapper.style.left = self.oldPosition+'px';
      if (self.oldPosition != self.position)
        window.requestAnimationFrame(move);
      
    }
    window.requestAnimationFrame(move);
    window.cancelAnimationFrame(self);
  }
}



var carouselWidow = new carousel();
