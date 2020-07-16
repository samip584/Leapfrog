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

const noteOptions = document.getElementById('note-options');
const addtuningDiv = document.getElementById('add-tuning-div');
const addtuningButton = document.getElementById('add-tunings');
const tuningOptionsDiv = document.getElementById('tuning-div');
const tuningOptions = document.getElementById('tuning-options');
const TuningCustomName = document.querySelector('.title-input');
const addInputTuning = document.getElementById('add-input-tuning');
const optionContainer = document.querySelector('.option-container');
const instrumentNotes = document.querySelector('.instrument-notes');
const instrumentOptionsDiv = document.getElementById('instrument-div');
const instrumentOptions = document.getElementById('instrument-options');
const tuningOptionsButton = document.querySelector('.tuning-options-button');
const instrumentButton = document.querySelector('.instrument-options-button');



let previousNotes=[]

instrumentOptionsDiv.addEventListener('click', function(e){
  if(e.target == instrumentOptionsDiv)
    instrumentOptionsDiv.style.display = 'none';
})


tuningOptionsDiv.addEventListener('click', function(e){
  if(e.target == tuningOptionsDiv){
    tuningOptionsDiv.style.display = 'none';
    instrumentOptionDisplay = false;
  }
})
addtuningDiv.addEventListener('click', function(e){
  if(e.target == addtuningDiv){
    addtuningDiv.style.display = 'none';
  }
})

addtuningButton.addEventListener('click', function(){
  noteOptions.innerText = '';
  for(i= instruments[instrument].tuning[0].notes.length; i > 0 ; i--){
    let noteOption = document.createElement('input');
    noteOption.setAttribute('autocomplete', 'off');
    noteOption.setAttribute('placeholder', i);
    noteOption.classList.add('input-note');
    noteOption.addEventListener('focusout', function(e){
      if (!noteStrings.includes(e.target.value.toUpperCase())){
        e.target.style.backgroundColor = '#E24242';
        readyToAdd = false;
      }
      else{
        e.target.style.backgroundColor = '#ef8354';
        readyToAdd = true;
      }
    })
    tuningOptionsDiv.style.display = 'none';
    instrumentOptionDisplay = false;
    noteOptions.appendChild(noteOption)
  }
  addtuningDiv.style.display = 'block';
})

addInputTuning.addEventListener('click', function(){
  let readyToAdd = true;
  let tuning = {name: '', notes: []}
  if(TuningCustomName.value){
    TuningCustomName.style.border = '1px solid white'
    tuning['name'] = TuningCustomName.value;
    let inputtedNotes = noteOptions.querySelectorAll('.input-note');
    inputtedNotes.forEach(function(inputtedNote){
      if(inputtedNote.value && inputtedNote.style.backgroundColor === 'rgb(239, 131, 84)')
        tuning.notes.push(inputtedNote.value.toUpperCase());
      else
      readyToAdd = false;
    })
    if(readyToAdd){
      instruments[instrument].tuning.push(tuning);
      localStorage.setItem('instruments',  JSON.stringify(instruments));
      currentTuning = instruments[instrument].tuning.length - 1;
      addtuningDiv.style.display = 'none';
      changeTuningOptions();
      changeTuning();
      tuningOptionDisplay = false;
      tuningOptionsDiv.style.display = 'block';
      optionContainer.style.top = 'calc(50% - '+optionContainer.clientHeight/2+'px)'
    }
  }
  else{
    TuningCustomName.style.border = '1px solid #E24242'
  }
})


instrumentButton.addEventListener('click', function(){
  if(!instrumentOptionDisplay)
  {
    instrumentOptionDisplay = false;
    instrumentOptionsDiv.style.display = 'block';
    optionContainer.style.top = 'calc(50% - '+optionContainer.clientHeight/2+'px)'
  }
})

tuningOptionsButton.addEventListener('click', function(){
  if (!tuningOptionDisplay)
  {
    tuningOptionDisplay = false;
    tuningOptionsDiv.style.display = 'block';
    optionContainer.style.top = 'calc(50% - '+optionContainer.clientHeight/2+'px)'
  }
})

function changeInstrumentOptions(){
  instrumentOptions.innerText = '';
  for (let option in instruments){
    let instrumentOption = document.createElement('div');
    instrumentOption.classList.add('instrument');
    let instrumentImgHolder = document.createElement('div');
    instrumentImgHolder.classList.add('instrument-img-holder');
    let instrumentImg = document.createElement('img');
    instrumentImg.classList.add('instrument-option-img');
    instrumentImg.src = instruments[option].imageSrc;
    instrumentImg.alt = instruments[option].name;
    instrumentImgHolder.appendChild(instrumentImg);
    instrumentOption.appendChild(instrumentImgHolder);
    let instrumentName = document.createElement('div');
    instrumentName.innerHTML = instruments[option].name;
    instrumentOption.appendChild(instrumentName);
    instrumentOptions.appendChild(instrumentOption);

    instrumentOption.addEventListener('click', function(){
      instrument = option;
      instrumentOptionsDiv.style.display = 'none';
      currentTuning = 0;
      changeInstrumentOptions();
      changeTuningOptions();
      changeTuning();
    })
  }
}

function changeTuningOptions(){
  tuningOptions.innerHTML = '';
  instruments[instrument].tuning.forEach(function(option){
    let dropdownOption = document.createElement('div');
    dropdownOption.classList.add('dropdown-option');
    if (instruments[instrument].tuning[currentTuning].name === option.name)
      dropdownOption.classList.add('dropdown-active-option');
    let htmlContent = option.name + '<br>';
    for(let i=0; i<option.notes.length - 1; i++)
      htmlContent += option.notes[i] + ' | ';
    htmlContent += option.notes[option.notes.length-1]
    dropdownOption.innerHTML =  htmlContent;

    dropdownOption.addEventListener('click', function(){
      currentTuning = instruments[instrument].tuning.indexOf(option);
      
      instrumentOptionDisplay = false;
      tuningOptionsDiv.style.display = 'none';
      changeTuningOptions();
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
  toTunediv.style.backgroundColor = color;
}