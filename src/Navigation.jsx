import React, { useState, useEffect } from 'react';

function Navigation({ userOnPage, setProfileOwner, ShowProfile, dict, CheckDict }) {
	function OpenMicroservice(targetService) {
		let services = ['news', 'calendar', 'music'];
		for (let service of services) (service == targetService) ? document.querySelector(`div.${service}`).style.visibility = 'visible' : document.querySelector(`div.${service}`).style.visibility = 'hidden';
	}
	return (
		<div className='navigation'>
			<button onClick={() => {OpenMicroservice('news')}}>Open News</button>
			<button onClick={() => {OpenMicroservice('calendar')}}>Open Calendar</button>
			<button onClick={() => {OpenMicroservice('music')}}>Open Music</button>
		</div>
	);
}
export default Navigation;