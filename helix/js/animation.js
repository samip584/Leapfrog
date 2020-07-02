class Animation{
  constructor(){
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext("2d");
    this.canvas.width = cnvWidth;
    this.canvas.height = cnvHeight;
    this.columns1 = [];
    this.columns2 = [];
    for (var i = 0; i < 30; i++) {
      this.columns1.push(new Column(i));
    }

  }
  animate(){
    setInterval(function () {
      helix.context.fillStyle = "#043a4a";
      helix.context.fillRect(0, 0, cnvWidth, cnvHeight);
      for (var i = 0; i < 30; i++) {
        helix.columns1[i].update(helix.context);
      }

    }, 20);
  }
}

var helix = new Animation()
helix.animate()