function noteFromPitch(frequency) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 57;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-57)/12);
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

function getNoteToTune(Note){
	let minSpace = noteStrings.length;
	
	instruments[instrument].tuning[currentTuning].notes.forEach(function(note){
		if (Math.abs(noteStrings.indexOf(note) - Note.note) < minSpace){
			minSpace = Math.abs(noteStrings.indexOf(note) - Note.note)
			if(noteToTune !== note){
				resetNoteDivs();
				noteToTune = note;
			}	
			
		}
	})
	
}

function correctionAction(frequency, note){
	let radius = 180;
	let acctualFrequency = frequencyFromNoteNumber(noteStrings.indexOf(noteToTune));
	let circumference = Math.PI * radius;
	if	(frequency > acctualFrequency){
		let arc = ((frequency - acctualFrequency)/(acctualFrequency * Math.pow(2, 1 / 6) - acctualFrequency)) * (circumference/2);
		angle = arc/radius;
		if (angle > 1.571)//90degree in radian
			angle = 1.571
	}
	else{
		let arc = ((acctualFrequency-frequency)/( acctualFrequency - acctualFrequency * Math.pow(2, 1 / 6))) * (circumference/2);
		angle = arc/radius;
		if (angle < -1.571)//90degree in radian
			angle = -1.571
	}

	if(frequency > frequencyFromNoteNumber(noteStrings.indexOf(noteToTune)) * Math.pow(2, 1 / 48)){
		adjustment.innerHTML= 'TOO HIGH!';
		adjustmentState = -1;
		noteColor = "#ffd83b";
	}
	else if(frequency < frequencyFromNoteNumber(noteStrings.indexOf(noteToTune)) * Math.pow(2, -1 / 48)){
		adjustmentState = -1;
		adjustment.innerHTML= 'TOO LOW!';
		noteColor = "#ffd83b";
	}
	else{
		adjustment.innerHTML = 'In Tune';
		adjustmentState = 1;
		noteColor = "#2AC70A";
	}
}
