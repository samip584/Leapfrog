
let dots = [];
let delta = 0;
let curTime = 0.0;
let timer, noteCount, accentPitch = 380, offBeatPitch = 200;

const counter = document.querySelector('.counter')
const beatNo = document.querySelector('.beats-no')
const bpmPlus = document.querySelector('.bpm-plus')
const bpmMinus = document.querySelector('.bpm-minus')
const bpmInput = document.querySelector('.bpm-input')
const playButton = document.querySelector('.play-btn')
const beatRange = document.querySelector('.beat-range')
const accentRange = document.querySelector('.accent-range')
const metronomeDetails = document.querySelector('.metronome-details')


function schedule() {
  while(curTime < audioContext.currentTime + 0.1) {
    playNote(curTime);
    updateTime();
  }
timer = window.setTimeout(schedule, 0.1);
}

function updateTime() {
  resizeBpmInput();
  curTime += 60.0 / parseInt(bpmInput.value, 10);
  noteCount++;
}

/* Play note on a delayed interval of t */
function playNote(t) {
    var note = audioContext.createOscillator();

    if(noteCount == parseInt(beatNo.value, 10) )
      noteCount = 0;

    if(dots[noteCount].classList.contains('active-dot'))
      note.frequency.value = accentPitch;
    else
      note.frequency.value = offBeatPitch;

    note.connect(audioContext.destination);

    note.start(t);
    note.stop(t + 0.05);

    dots.forEach(function(dot){
      dot.classList.remove('playing')
    })
    dots[noteCount].classList.add('playing')
}


function resizeBpmInput() {
  bpmInput.style.width = bpmInput.value.length + "ch";
  metronomeDetails.style.width = bpmInput.clientWidth + 184 + 'px';
}

/* Add or subtract bpm */
bpmMinus.addEventListener('click', function(){
  bpmInput.value = parseInt(bpmInput.value , 10) - 1;
  resizeBpmInput();
})

bpmPlus.addEventListener('click', function(){
  bpmInput.value = parseInt(bpmInput.value , 10) + 1;
  resizeBpmInput();
})

beatRange.addEventListener('change', function(){
  offBeatPitch = beatRange.value;
})

accentRange.addEventListener('change', function(){
  accentPitch = accentRange.value;
})

bpmInput.addEventListener('change',function(){
  console.log('ok')
  noteCount = 0;
  bpmInput.value = parseInt(bpmInput.value , 10);
  resizeBpmInput();
})

function updateCounter() {
  dots = [];
  counter.innerHTML = '';
  for(let i = 0; i < parseInt(beatNo.value, 10); i++){
    let temp = document.createElement('div');
    temp.classList.add('dot');

    if(i === 0)
      temp.classList.add('active-dot');
    counter.append( temp );
    dots.push(temp)

    temp.addEventListener('click', function(e){
      e.target.classList.toggle('active-dot')
    })
  }
}


/* Add dots when time signature is changed */
beatNo.addEventListener('change', function(e){
  if(e.target.value && e.target.value > 0){
    noteCount = 0;
    updateCounter();
  }
})




/* Play and stop button */
playButton.addEventListener('click', function(){
  if(playButton.getAttribute('alt') === 'pause')
  {
    // ====== Pause ====== //
    playButton.getElementsByTagName('i')[0].classList.remove('fa-pause');
    playButton.getElementsByTagName('i')[0].classList.add('fa-play');
    playButton.setAttribute('title', 'Play beat');
    playButton.setAttribute('alt', 'play');
    window.clearInterval(timer);
  }
  else {
    // ====== Play ====== //
    playButton.getElementsByTagName('i')[0].classList.remove('fa-play');
    playButton.getElementsByTagName('i')[0].classList.add('fa-pause');
    playButton.setAttribute('title', 'Pause beat');
    playButton.setAttribute('alt', 'pause');
    curTime = audioContext.currentTime;
    noteCount = parseInt(beatNo.value, 10);
    schedule();

  }
})
