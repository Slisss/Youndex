import React, { useState, useEffect } from 'react';
import News from './News';
import Calendar from './Calendar';
import Music from './Music';

function Navigation({ userOnPage, setProfileOwner, ShowProfile, dict, CheckDict }) {
	function OpenMicroservice(targetService) {
		let services = ['news', 'calendar', 'music'];
		for (let service of services) (service == targetService) ? document.querySelector(`div.${service}`).style.display = 'block' : document.querySelector(`div.${service}`).style.display = 'none';
	}
	return (
		<div className='navigation'>
			<button onClick={() => {OpenMicroservice('news')}}>Open News</button>
			<button onClick={() => {OpenMicroservice('calendar')}}>Open Calendar</button>
			<button onClick={() => {OpenMicroservice('music')}}>Open Music</button>
			<News
				userOnPage={userOnPage}
				setProfileOwner={setProfileOwner}
				ShowProfile={ShowProfile}
				dict={dict}
				CheckDict={CheckDict}
			/>
			<Calendar />
			<Music />
		</div>
	);
}
export default Navigation;