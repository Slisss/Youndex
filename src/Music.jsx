import React, { useState, useEffect } from 'react';
import Track from './Track';
function Music() {
	let [allTrax, setTrax] = useState([]);
	let [traxCount, setTraxCount] = useState(0);
	
	let [curTrack, setCT] = useState(0);
	
	let [newTrackId, setNewTrackId] = useState(0);
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Trackcount')
		.then(res => res.json())
		.then(res => setNewTrackId(res.id__max+1))
	}, [traxCount])
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Tracklist')
		.then(response => response.json())
		.then(trax => {
			setTrax(trax.sort((a, b) => b.likes - a.likes));
			setTraxCount(trax.length);
		})
	}, [traxCount]);
	 function OpenForm() {
		document.querySelector('form.newTrack').style.display = 'block';
	 }
	function CloseForm(e) {
		e.preventDefault();
		document.querySelector('form.newTrack').style.display = 'none';
		document.querySelector('form.newTrack > #author').value = '';
		document.querySelector('form.newTrack > #name').value = '';
		document.querySelector('form.newTrack > #album').value = '';
		document.querySelector('form.newTrack > #src').value = '';
	}
	function Upload(e) {
		e.preventDefault();
		
		let in1 = document.querySelector('form.newTrack > #author').value;
		let in2 = document.querySelector('form.newTrack > #name').value;
		let in3 = document.querySelector('form.newTrack > #album').value;
		let in4 = document.querySelector('form.newTrack > #src').value;
		
		if (in1 == '' || in2 == '' || in3 == '' || in4 == '') { window.alert('all fields must not be empty'); return; }
		if (in1.length > 200 || in2.length > 200 || in3.length > 200 || in4.length > 300)  { window.alert('some fields exceed allowed length'); return; }
		
		in4.length -= 4;
		in4 += 'raw=1';
		
		fetch('http://127.0.0.1:8000/api/Tracklist', { 
			method: 'POST',
			body: JSON.stringify({
				id: newTrackId,
				author: in1,
				name: in2,
				album: in3,
				src: in4
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => { setTrackCount(traxCount + 1); CloseForm(e); })
	}
	function MoveTrack(incr) {
		let fincr = (allTrax.indexOf(curTrack) + incr < 0) ? allTrax.length - 1 : (allTrax.indexOf(curTrack) + incr >= allTrax.length) ? 0 : allTrax.indexOf(curTrack) + incr;
		setCT(allTrax[fincr]);
		setTimeout(() => { document.querySelector('audio').play(); }, 1);
	}
	function PlayTrack(t) {
		setCT(t);
		setTimeout(() => { document.querySelector('audio').play(); }, 1);
	}
	return (
		<div className='music'>
			{allTrax.map((t) => 
				<Track
					key={t.id}
					track={t}
					play={PlayTrack}
					traxCount={traxCount}
					setTraxCount={setTraxCount}
				/>
			)}
			
			<button className='addNew' onClick={OpenForm}>Add New Song</button>
			
			<div className='curTrack'>
				<div className='title'>Now Playing:</div>
				<div className='trackData'>
					<p>{curTrack.author}</p>
					<p>{curTrack.name}</p>
					<p>{curTrack.album}</p>
				</div>
				<audio controls controlsList='nodownload' src={curTrack.src} type='audio/mpeg' onEnded={()=>{MoveTrack(1)}} />
				<button onClick={()=>{MoveTrack(-1)}}>Prev</button>
				<button onClick={()=>{MoveTrack( 1)}}>Next</button>
			</div>
			
			<form className='newTrack'>
				<h1>Upload a New Track</h1>
				<label>Author</label><br/>
				<input id='author' max='200'></input><br/>
				<label>Song Name</label><br/>
				<input id='name' max='200'></input><br/>
				<label>Album</label><br/>
				<input id='album' max='200'></input><br/>
				<label>Valid Dropbox Link</label><br/>
				<input id='src' max='300'></input>
				<div className='controls'>
					<button onClick={Upload}>Upload</button>
					<button onClick={CloseForm}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
export default Music;