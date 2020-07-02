canvas.addEventListener("click", function(evt){
  switch(game.state){
      case 0:
        game.state = 1;
        break;
      case 1:
          game.bird.jump();
          break;
      case 2:
        let rect = canvas.getBoundingClientRect();
        let clickX = evt.clientX - rect.left;
        let clickY = evt.clientY - rect.top;
        if(clickX >= 120 && clickX <= 263 + 83 && clickY >= 263 && clickY <= 263 + 29){
          game.state = 0;
          game.bird.y = 137;
          game.bird.speed = 0; 
          game.pipes.position = [];
          score = 0;
        }
        break;
  }
});

document.addEventListener('keyup', function(key){
  if(key.keyCode === 32){
    switch(game.state){
        case 0:
          game.state = 1;
          break;
        case 1:
            game.bird.jump();
            break;
        case 2:
          game.state = 0;
          game.bird.y = 137;
          game.bird.speed = 0; 
          game.pipes.position = [];
          score = 0;
          break;
    }
  }
});
