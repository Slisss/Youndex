import React, { useState, useEffect } from 'react';
function Track({track, play}) {
	
	return (
		<div id={'t' + track.id} className='track'>
			<p>{track.author}</p>
			<p>{track.name}</p>
			<p>{track.album}</p>
			<button onClick={() => {play(track)}}>Play</button>
		</div>
	);
}
export default Track;