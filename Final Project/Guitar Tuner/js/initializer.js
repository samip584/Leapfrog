window.AudioContext = window.AudioContext || window.webkitAudioContext;

programStarter = document.getElementById('start-button')
programStarter.addEventListener('click', function(event){
  let welcomePage = document.getElementById('welcome-page')
  welcomePage.style.display = 'none';
  audioContext = new AudioContext();
  MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));	// corresponds to a 5kHz signals

  for (let option in instruments){
    let instrumentOption = document.createElement('div');
    instrumentOption.classList.add('instrument');
    let instrumentImg = document.createElement('img')
    instrumentImg.classList.add('instrument-option-img');
    instrumentImg.src = instruments[option].imageSrc;
    instrumentImg.alt = instruments[option].name;
    instrumentOption.appendChild(instrumentImg);
    let instrumentName = document.createElement('div');
    instrumentName.innerHTML = instruments[option].name;
    instrumentOption.appendChild(instrumentName);
    instrumentOptions.appendChild(instrumentOption);

    instrumentOption.addEventListener('click', function(){
      instrument = option;
      instrumentOptionsDiv.style.display = 'none';
      changeTuningOptions();
      changeTuning();
    })
    
  }

  changeTuningOptions();
 
  changeTuning();
  
  audioContext.resume();

  tuningOptionsButton.innerHTML = instruments[instrument].tuning[0].name;
  
  toggleLiveInput();
})


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
                  "googNoiseSuppression": "true",
                  "googHighpassFilter": "false"
              },
              "optional": []
          },
      }, gotStream);
}
