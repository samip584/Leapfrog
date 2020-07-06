const noteFromPitch =( frequency ) => {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	// console.log(frequency, Math.round( noteNum ) + 59)
	return Math.round( noteNum ) + 59;
}

function frequencyFromNoteNumber( note ) {
	// console.log(440 * Math.pow(2,(note-59)/12))
	return 440 * Math.pow(2,(note-59)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

function mostRecurrect(Notes){
	var map = {};
	var mostFrequentElement = Notes[0].note;
	for(var i = 0; i<Notes.length; i++){
		if(!map[Notes[i].note]){
				map[Notes[i].note]=1;
		}
		else{
			++map[Notes[i].note];
			if(map[Notes[i].note]>map[mostFrequentElement]){
					mostFrequentElement = Notes[i].note;
			}
		}
	}
	return mostFrequentElement;
}

function getNote(Notes){
	var tempNote = mostRecurrect(Notes)
	num = 0;
	avg = 0;
	Notes.forEach(function(element){
		if (element.note === tempNote){
			avg += element.pitch;
			num += 1;
		}
	});
	avg = avg/num;
	return {note: tempNote, pitch : avg}
}

function correctionAction(frequency, note){
	if(frequency > frequencyFromNoteNumber(note) * Math.pow(2, 1 / 48))
		console.log(' lower ')
	else if(frequency < frequencyFromNoteNumber(note) * Math.pow(2, -1 / 48))
		console.log(' higher ')
}



var notes = [];

function updatePitch( ) {
	tick +=1;
	analyser.getFloatTimeDomainData( buf );
	var ac = autoCorrelate( buf, audioContext.sampleRate ); //frequency
 	if (ac == -1) {
 		detectorElem.className = "vague";
	 	pitchElem.innerText = "--";
		noteElem.innerText = "-";
		detuneElem.className = "";
		detuneAmount.innerText = "--";
		tick = 0;
		notes = [];
	 } 
	 else {
		pitch = ac;
		notes.push({note : noteFromPitch(pitch), pitch : pitch})
		if (tick > 6){
			tick = 0;
			var Note = getNote(notes);
			correctionAction(Note.pitch, Note.note)
			notes = [];
			detectorElem.className = "confident";
			pitchElem.innerText = Math.round( Note.pitch ) ;
			
			noteElem.innerHTML = noteStrings[Note.note];
			var detune = centsOffFromPitch( Note.pitch, Note.note );
			console.log(Note, detune)
			if (detune == 0 ) {
				detuneElem.className = "";
				detuneAmount.innerHTML = "--";
			} else {
				if (detune < 0)
					detuneElem.className = "flat";
				else
					detuneElem.className = "sharp";
				detuneAmount.innerHTML = Math.abs( detune );
			}
		}

	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	window.requestAnimationFrame( updatePitch );
}

