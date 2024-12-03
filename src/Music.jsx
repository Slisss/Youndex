import React, { useState, useEffect } from 'react';
import Track from './Track';
function Music() {
	let [trax, setTrax] = useState([
		{id: 1, author: 'The Prodigy', name: 'Firestarter', album: 'The Fat Of The Land'},
		{id: 2, author: 'Alphatown', name: 'Hot Stuff', album: 'Super Eurobeat Vol. 2'},
		{id: 3, author: 'Junkie XL', name: 'Underachievers', album: 'Saturday Teenage Kick'},
		{id: 4, author: 'Fatboy Slim', name: 'Right Here, Right Now', album: 'You\'ve Come A Long Way, Baby'},
		{id: 5, author: 'Netsky', name: 'Iron Heart', album: 'Netsky'},
	]);
	let [curTrack, setCT] = useState(trax[0]);
	
	function MoveTrack(incr) {
		let fincr = (trax.indexOf(curTrack) + incr < 0) ? trax.length - 1 : (trax.indexOf(curTrack) + incr >= trax.length) ? 0 : trax.indexOf(curTrack) + incr;
		setCT(trax[fincr]);
	}
	return (
		<div className='music'>
			{trax.map((t) => 
				<Track
					track={t}
				/>
			)}
			<div className='curTrack'>
				<p>Now Playing:</p>
				<p>{curTrack.author}</p>
				<p>{curTrack.name}</p>
				<p>{curTrack.album}</p>
				<button onClick={()=>{MoveTrack(-1)}}>Prev</button>
				<button>Play/Pause</button>
				<button onClick={()=>{MoveTrack( 1)}}>Next</button>
			</div>
		</div>
	);
}
export default Music;