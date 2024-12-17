import React, { useState, useEffect } from 'react';
function Track({track, play, traxCount, setTraxCount}) {
	
	let [l, setL] = useState(false);
	let [d, setD] = useState(false);
	
	function Like(incr) {
		if (incr > 0) {
			if (l) { incr *= -1; setL(false); }
			else { if (d) incr *= 2; setL(true); setD(false); }
		}
		else {
			if (d) { incr *= -1; setD(false); }
			else { if (l) incr *= 2; setD(true); setL(false); }
		}
		
		fetch(`http://127.0.0.1:8000/api/Tracklist/${track.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: track.id,
				author: track.author,
				name: track.name,
				album: track.album,
				src: track.src,
				likes: track.likes + incr
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => {
			setTraxCount(traxCount - 1);
			setTraxCount(traxCount + 1);
		})
	}
	return (
		<div id={'t' + track.id} className='track'>
			<div className='trackData'>
				<p>{track.author}</p>
				<p>{track.name}</p>
				<p>{track.album}</p>
			</div>
			<div className='likes'>
				<button id='l' onClick={() => {Like( 1)}}>+</button>
				<div>{track.likes}</div>
				<button id='d' onClick={() => {Like(-1)}}>-</button>
			</div>
			<button id='play' onClick={() => {play(track)}}>Play</button>
		</div>
	);
}
export default Track;