let angle =0;
let noteDivs;
let notes = [];
let noteToTune;
let note, notePitch;
let adjustmentState;
let currentTuning = 0;
let optionDisplay = false;
let noteColor = "#ffd83b";

const tuning = document.getElementById('tuning');
const tuningOptionsDiv = document.getElementById('tuning-div');
const tuningOptionsButton = document.querySelector('.tuning-options-button');
tuningOptionsDiv.addEventListener('click', function(){
  tuningOptionsDiv.style.display = 'none';
})



tuning.addEventListener('click', function(){
  if (optionDisplay){
    optionDisplay = false;
    tuningOptionsDiv.style.display = 'none';
  }
  else
  {
    optionDisplay = true;
    tuningOptionsDiv.style.display = 'block';
  }
})

function drawBackGround(){
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = "#ffffff";
  ctx.moveTo(245, 65);
  ctx.lineTo(255, 65);
  ctx.lineTo(250, 70);
  ctx.fill();
  ctx.fillRect(220, 41, 60, 24);
  ctx.fillStyle = "#2AC70A";
  ctx.font = "14px Arial";
  ctx.fillText("Perfect", 227, 58);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(250, 270, 200, Math.PI, 2 * Math.PI);
  ctx.fill(); 
  ctx.fillStyle = "#838383";
  ctx.font = "30px Arial";
  ctx.fillText("♯", 390, 225); 
  ctx.fillText("♭", 110, 225); 
  ctx.strokeStyle = "#b5b5b5";
  ctx.moveTo(250, 300);
  ctx.lineTo(250, 70);
  ctx.stroke(); 
}



function drawNeedle(state, angle = 0){
  let needle = new Image;  
  ctx.save(); 
  needle.src = needles[state + 1];
  ctx.translate(250, 247);
  ctx.rotate(angle);
  ctx.translate(-250, -247);
  ctx.drawImage(needle, 244, 86, 12, 180);
  ctx.restore();
  ctx.font = "1px Arial";
  ctx.fillStyle = "red";
}

function drawNote(note, pitch, detune){
  ctx.fillStyle = noteColor;
  ctx.lineWidth = 1;
  ctx.font = "100px Arial";
  ctx.fillText(note, 250 - ctx.measureText(note).width/2, 220); 
  ctx.font = "20px Arial";
  ctx.fillText(pitch + ' Hz', 250 - ctx.measureText(pitch + ' Hz').width/2, 140); 
}

function changeTuning(){
  noteDivs = {}
  let instrumentNotes = document.querySelector('.instrument-notes');
  instrumentNotes.textContent = '';
	guitarTunings[currentTuning].notes.forEach(function(note){
		let instrumentNote = document.createElement('div');
		instrumentNote.classList.add('instrument-note')
    instrumentNote.innerHTML = note.slice(0, -1);;
    noteDivs[note] = instrumentNote;
		instrumentNotes.appendChild(instrumentNote);
  })
  tuningOptionsButton.innerHTML = guitarTunings[currentTuning].name;
}

function resetNoteDivs(){
  let instrumentNotes = document.getElementsByClassName('instrument-note');
  for( i = 0; i< instrumentNotes.length; i++)
    instrumentNotes[i].style.backgroundColor = "#ef8354";
}


function showNoteToTune(color){
  let toTunediv = noteDivs[noteToTune];
  console.log(toTunediv)
  toTunediv.style.backgroundColor = color;
}