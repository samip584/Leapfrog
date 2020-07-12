let angle =0;
let noteDivs;
let notes = [];
let noteToTune;
let note, notePitch;
let adjustmentState;
let currentTuning = 0;
let noteColor = "#ffd83b";
let instrument = 'guitar';
let tuningOptionDisplay = false;
let instrumentOptionDisplay = false;

const tuningOptionsDiv = document.getElementById('tuning-div');
const tuningOptions = document.getElementById('tuning-options');
const instrumentNotes = document.querySelector('.instrument-notes');
const instrumentOptionsDiv = document.getElementById('instrument-div');
const instrumentOptions = document.getElementById('instrument-options');
const tuningOptionsButton = document.querySelector('.tuning-options-button');
const instrumentButton = document.querySelector('.instrument-options-button');




tuningOptionsDiv.addEventListener('click', function(){
  tuningOptionsDiv.style.display = 'none';
})



instrumentButton.addEventListener('click', function(){
  if (instrumentOptionDisplay){
    instrumentOptionDisplay = false;
    instrumentOptionsDiv.style.display = 'none';
  }
  else
  {
    instrumentOptionDisplay = true;
    instrumentOptionsDiv.style.display = 'block';
    instrumentOptions.style.top = 'calc(50% - '+instrumentOptions.clientHeight/2+'px)'
  }
})

tuningOptionsButton.addEventListener('click', function(){
  if (tuningOptionDisplay){
    tuningOptionDisplay = false;
    tuningOptionsDiv.style.display = 'none';
  }
  else
  {
    tuningOptionDisplay = true;
    tuningOptionsDiv.style.display = 'block';
    tuningOptions.style.top = 'calc(50% - '+tuningOptions.clientHeight/2+'px)'
  }
})

function changeTuningOptions(){
  currentTuning = 0;
  tuningOptions.innerHTML = '';
  instruments[instrument].tuning.forEach(function(option){
    let dropdownOption = document.createElement('div');
    dropdownOption.classList.add('dropdown-option');
    let htmlContent = option.name + '<br>';
    for(let i=0; i<option.notes.length - 1; i++)
      htmlContent += option.notes[i] + ' | ';
    htmlContent += option.notes[option.notes.length-1]
    dropdownOption.innerHTML =  htmlContent;

    dropdownOption.addEventListener('click', function(){
      currentTuning = instruments[instrument].tuning.indexOf(option);
      tuningOptionsDiv.style.display = 'none';
      changeTuning();
    })
    tuningOptions.appendChild(dropdownOption);
  })
  
}

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
  instrumentNotes.textContent = '';
  let instrumentNotesWidth = 0;
	instruments[instrument].tuning[currentTuning].notes.forEach(function(note){
		let instrumentNote = document.createElement('div');
		instrumentNote.classList.add('instrument-note')
    instrumentNote.innerHTML = note.slice(0, -1);;
    noteDivs[note] = instrumentNote;
    instrumentNotes.appendChild(instrumentNote);
    instrumentNotesWidth += 80;
  })
  
  instrumentButton.textContent = '';
  let instrumentImg = document.createElement('img')
  instrumentImg.src = instruments[instrument].imageSrc;
  instrumentImg.title = instrument;
  instrumentButton.appendChild(instrumentImg);
  
  instrumentNotes.style.width = instrumentNotesWidth+'px';
  tuningOptionsButton.innerHTML = instruments[instrument].tuning[currentTuning].name;
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