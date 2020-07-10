window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.onload = function() {
	audioContext = new AudioContext();
  MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));	// corresponds to a 5kHz signals
  let tuningOptions = document.getElementById('tuning-options')
  guitarTunings.forEach(function(option){
    let dropdownOption = document.createElement('div');
    dropdownOption.classList.add('dropdown-option');
    let htmlContent = option.name + '<br>';
    for(let i=0; i<option.notes.length - 1; i++)
      htmlContent += option.notes[i] + ' | ';
    htmlContent += option.notes[option.notes.length-1]
    dropdownOption.innerHTML =  htmlContent;

    dropdownOption.addEventListener('click', function(){
      console.log(guitarTunings.indexOf(option))
      currentTuning = guitarTunings.indexOf(option);
      tuningOptionsDiv.style.display = 'none';
      changeTuning();
    })
    tuningOptions.appendChild(dropdownOption);
  })
  changeTuning();

  audioContext.resume();

  tuningOptionsButton.innerHTML = guitarTunings[0].name;
  
  toggleLiveInput();
}

function error() {
  alert('Stream generation failed.');
}

function getUserMedia(dictionary, callback) {
  try {
      navigator.getUserMedia = 
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      navigator.getUserMedia(dictionary, callback, error);
  } catch (e) {
      alert('getUserMedia threw exception :' + e);
  }
}

function gotStream(stream) {
  // Create an AudioNode from the stream.
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  // Connect it to the destination.
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  mediaStreamSource.connect( analyser );
  updatePitch();
}

function toggleLiveInput() {
  getUserMedia(
    {
          "audio": {
              "mandatory": {
                  "googEchoCancellation": "false",
                  "googAutoGainControl": "false",
                  "googNoiseSuppression": "false",
                  "googHighpassFilter": "false"
              },
              "optional": []
          },
      }, gotStream);
}
