function updatePitch( ) {
	let adjustment = document.getElementById('adjustment');
	tick +=1;
	analyser.getFloatTimeDomainData( buf );
	let ac = autoCorrelate( buf, audioContext.sampleRate ); //frequency

 	if (ac == -1) {
		if(tick > 60){
			adjustment.innerHTML = 'Pluck a string';
			tick = 0;
			notes = [];
			drawBackGround();
			drawNeedle(0, 0);
			resetNoteDivs();
			previousNotes=[];
		}
	} 
	else {
		drawBackGround();
		pitch = ac;
	
		notes.push({note : noteFromPitch(pitch), pitch : pitch})
		if (note){
			drawNote(noteToTune, notePitch, 1);
			let drawAngle = angle;
			drawNeedle(adjustmentState, drawAngle);
		}
		if (tick > 5){
			tick = 0;
			
			let Note = getNote(notes);
			if(Note.pitch > 1000){
				if(previousNotes[previousNotes.length - 1])
					Note = previousNotes[previousNotes.length - 1]
				else
					Note.pitch = 1000;
			}
			previousNotes.push(Note);
			if (previousNotes.length > 5){
				previousNotes.shift();
				for (let i = 1; i < 5; i++)
					if (Note.note <  previousNotes[previousNotes.length - i].note - 1 || Note.note >  previousNotes[previousNotes.length - i].note + 1 ){
						Note =  getNote(previousNotes);	
					}
			}

			getNoteToTune(Note);
			showNoteToTune("#2AC70A");
			correctionAction(Note.pitch, Note.note)
			notes = [];
			note = noteStrings[Note.note];
			notePitch = Note.pitch.toFixed(2);
			let detune = centsOffFromPitch( Note.pitch, Note.note );
		}
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	window.requestAnimationFrame( updatePitch );
}

