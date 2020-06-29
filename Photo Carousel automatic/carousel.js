function carousel(container){
  let self = this;
  this.container = container;
  this.wrapper = this.container.querySelector(".carousel-image-wrapper");
  this.images = this.wrapper.getElementsByTagName("img");
  this.holdTime = parseFloat(this.container.getAttribute("holdTime"))
  if (!this.holdTime){
    this.holdTime = 2;
  }
  this.animationTime = parseFloat(this.container.getAttribute("animationTime"))
  if (!this.animationTime){
    this.animationTime = 0.5;
  }

  this.position = 0;
  this.oldPosition = 0;
  this.velocity = this.container.clientWidth/(this.animationTime * 60);
  this.holdTick = 0;
  this.animationTick = 0;
  

  this.configureContainer = function(){
    this.container.style.overflow ="hidden";
    this.container.style.position ="relative";
  }
  this.configureWrapper = function(){
    this.wrapper.style.width = this.container.clientWidth * this.images.length +'px';
    this.wrapper.style.height = 100+'%';
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.left = 0;
  }

  this.addNavigationButtons = function(){
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
  }

  this.configureImages = function(){
    for (i=0; i<this.images.length; i++){
      this.images[i].style.width = this.container.clientWidth+'px';
      this.images[i].style.float = 'left';
    }
  }

  this.addPagination = function(){
    this.paginationContainer = document.createElement('div');
    this.paginationContainer.style.position = "absolute";
    this.paginationContainer.style.bottom = '2%';
    this.container.appendChild(this.paginationContainer);
  }

  this.createBulletHover = function(paginationbutton){
    paginationbutton.addEventListener("mouseover", function(){
      self.pageigationHover(paginationbutton);
    });
    paginationbutton.addEventListener("mouseout", function(){
      self.notPageigationHover(paginationbutton);
    });
  }

  this.createBullet= function(page){
    this.paginationbutton = document.createElement('div');
    this.paginationbutton.style.float = 'left';
    this.paginationbutton.style.borderRadius = '50%';
    this.paginationbutton.style.height = '15px';
    this.paginationbutton.style.width = '15px';
    this.paginationbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    this.paginationbutton.style.margin = '2px';
    this.paginationbutton.addEventListener('click', function(){
      self.goTo(page);
    });
    this.paginationContainer.appendChild(this.paginationbutton);
    this.createBulletHover(self.paginationbutton)
  }

  this.hold = function(){
    self.holdTick +=1;
    if (self.holdTick > self.holdTime * 60){
      self.holdTick = 0;
      self.goRight();
    }
    window.requestAnimationFrame(self.hold);
  }
  
  window.requestAnimationFrame(this.hold);

  this.goRight = function(){
    self.holdTick = 0;
    self.oldPosition = self.position;
    self.position = (self.position - self.container.clientWidth)%self.wrapper.clientWidth;
    self.changeAnimation();
    self.activate();
  }

  this.goLeft = function(){
    self.holdTick = 0;
    self.oldPosition = self.position;
    self.position = self.position + self.container.clientWidth;
    if (self.position > 0){
      self.position = -(self.wrapper.clientWidth - self.container.clientWidth);
    }
    self.changeAnimation();
    self.activate();
  }

  this.goTo = function(page){
    self.holdTick = 0;
    self.oldPosition = self.position;
    self.position = -page * self.container.clientWidth;
    self.changeAnimation();
    self.activate();
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

  this.activate = function()
  {
    var index = Math.abs((self.position/self.wrapper.clientWidth)*self.images.length);
    var oldIndex = Math.abs((self.oldPosition/self.wrapper.clientWidth)*self.images.length);
    var buttons = self.paginationContainer.getElementsByTagName('div');
    buttons[index].style.backgroundColor = 'rgb(255, 255, 255)';
    buttons[index].addEventListener("mouseout", function(){
      buttons[index].style.backgroundColor = 'rgb(255, 255, 255)';
    });
    buttons[oldIndex].style.backgroundColor = 'rgb(255, 255, 255, 0.6)';
    buttons[oldIndex].addEventListener("mouseout", function(){
      buttons[oldIndex].style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    });
  }
  
  this.changeAnimation = function(){
    self.animationTick = 0;
    self.velocity = self.container.clientWidth/(self.animationTime * 60);
    if (Math.abs(self.oldPosition - self.position)>self.container.clientWidth)
      self.velocity = self.velocity * self.images.length;
    
    function move(){
      self.animationTick +=1; 
      if (Math.abs(self.oldPosition - self.position)<self.velocity){
        self.wrapper.style.left = self.position+'px';
        self.oldPosition = self.position;
      }
      else if (self.oldPosition > self.position)
        self.oldPosition = self.oldPosition - self.velocity;
      else
        self.oldPosition = self.oldPosition + self.velocity;
      self.wrapper.style.left = self.oldPosition+'px';
      
      if (self.oldPosition !== self.position)
        window.requestAnimationFrame(move);
      
    }
    window.requestAnimationFrame(move);
    window.cancelAnimationFrame(self);
  }

  this.configureContainer()
  this.configureWrapper()
  this.addNavigationButtons()
  this.configureImages()
  this.addPagination()
  for (var i=0; i<this.images.length; i++){
    this.createBullet(i);
  }
  this.paginationContainer.style.left = 'calc(50% - '+(this.paginationContainer.clientWidth / 2)+'px)';
}


var containers = document.getElementsByClassName("carousel-container");

function makeCarosel(containers) {
  var carouselWindow = {}
  for (var i = 0; i < containers.length; ++i) {
    carouselWindow[i] = new carousel(containers[i])
  }
  return carouselWindow
}

makeCarosel(containers);

window.onresize = function(){makeCarosel(containers);}