import React, { useState, useEffect } from 'react';
import Track from './Track';
function Music() {
	let [trax, setTrax] = useState([
		{id: 1, author: 'The Prodigy', name: 'Firestarter', album: 'The Fat Of The Land', src: 'https://www.dropbox.com/scl/fi/7rno5hx2ywub7fcec194c/08.-Firestarter.mp3?rlkey=4ybtjby5tmm0cmf1iev5ms7un&st=ip6ryctb&raw=1'},
		{id: 2, author: 'Junkie XL', name: 'Underachievers', album: 'Saturday Teenage Kick', src: 'https://www.dropbox.com/scl/fi/xltnm2ov05gz7xeb5kqn0/12.-Junkie-XL-Underachievers.mp3?rlkey=7plotjf1wy8wrvazkjhd96he6&st=ouvdobwn&raw=1'},
		{id: 3, author: 'Netsky', name: 'Iron Heart', album: 'Netsky', src: 'https://www.dropbox.com/scl/fi/t9ve7a4ucbajd25aj7nhg/02-Netsky-Iron-Heart.mp3?rlkey=nu95comxudy790s5upmllejii&st=wuxsc1gr&raw=1'},
	]);
	let [curTrack, setCT] = useState(trax[0]);
	
	function MoveTrack(incr) {
		let fincr = (trax.indexOf(curTrack) + incr < 0) ? trax.length - 1 : (trax.indexOf(curTrack) + incr >= trax.length) ? 0 : trax.indexOf(curTrack) + incr;
		setCT(trax[fincr]);
		setTimeout(() => { document.querySelector('audio').play(); }, 1);
	}
	function PlayTrack(t) {
		setCT(t);
		setTimeout(() => { document.querySelector('audio').play(); }, 1);
	}
	return (
		<div className='music'>
			{trax.map((t) => 
				<Track
					track={t}
					play={PlayTrack}
				/>
			)}
			<div className='curTrack'>
				<p>Now Playing:</p>
				<audio controls src={curTrack.src} type='audio/mpeg' onEnded={()=>{MoveTrack(1)}} />
				<p>{curTrack.author}</p>
				<p>{curTrack.name}</p>
				<p>{curTrack.album}</p>
				<button onClick={()=>{MoveTrack(-1)}}>Prev</button>
				<button onClick={()=>{MoveTrack( 1)}}>Next</button>
			</div>
		</div>
	);
}
export default Music;