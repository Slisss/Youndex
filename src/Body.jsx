import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Login from './Login';
import Navigation from './Navigation';

function Body() {
	let [userOnPage, setUserOnPage] = useState('');
	let [loggedIn, setLoggedIn] = useState(0);

	let [profileOwner, setProfileOwner] = useState('');
	let dictionary = ['qawsed', 'zxc'];
	
	function ShowProfile(username) {
		setProfileOwner(username);
		document.querySelector('div.profile').style.display = 'block';
	}
	function CheckDict(msg, dict) {
		for (let word of dict) {
			if (msg.indexOf(word) >= 0) return true;
		}
		return false;
	}
	return (
		<div className='body'>
			<Login
				setUserOnPage={setUserOnPage}
				setLoggedIn={setLoggedIn}
				dict={dictionary}
				CheckDict={CheckDict}
			/>
			{loggedIn ?
				<div>
					logged in as {userOnPage}
					<button id='profile' onClick={() => {ShowProfile(userOnPage)}}>Show Your Profile</button>
				</div>
			: ''}
			<Profile
				userOnPage={userOnPage}
				profileOwner={profileOwner}
				dict={dictionary}
				CheckDict={CheckDict}
			/>
			{loggedIn ?
				<Navigation
					userOnPage={userOnPage}
					setProfileOwner={setProfileOwner}
					ShowProfile={ShowProfile}
					dict={dictionary}
					CheckDict={CheckDict}
				/>
			: ''}
		</div>
	);
}

export default Body;