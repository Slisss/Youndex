import React, { useState, useEffect } from 'react';
function Track({track}) {
	
	return (
		<div id={'t' + track.id} className='track'>
			<p>{track.author}</p>
			<p>{track.name}</p>
			<p>{track.album}</p>
			<button>Play</button>
		</div>
	);
}
export default Track;