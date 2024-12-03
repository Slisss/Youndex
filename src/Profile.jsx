import React, { useState, useEffect } from 'react';

function Profile({userOnPage, profileOwner, dict, CheckDict}) {
	let [ownerData, setOwnerData] = useState({});
	let [upd, setUpd] = useState(true);
	
	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/Userlist/${profileOwner}`)
		.then(response => response.json())
		.then(userData => {
			setOwnerData(userData);
			ApplyPic(userData.pfpSrc);
		})
	}, [profileOwner, upd]);
	
	function CloseProfile(e) {
		document.querySelector('div.profile').style.display = 'none';
		CloseForm(e);
	}
	function ApplyPic(src) {
		document.querySelector('div.profile > div.pfp').style.backgroundImage = 'url(' + src + ')';
	}
	function OpenForm() {
		document.querySelector('form.editProfile').style.display = 'block';
		document.querySelector('form.editProfile > #bio').value = ownerData.bio;
		document.querySelector('form.editProfile > #pfpSrc').value = ownerData.pfpSrc;
	}
	function CloseForm(e) {
		e.preventDefault()
		document.querySelector('form.editProfile').style.display = 'none';
	}
	function Upload(e) {
		e.preventDefault();
		let in1 = document.querySelector('form.editProfile > #bio').value;
		
		if (CheckDict(in1, dict)) { window.alert('bad language'); return; }
		
		fetch(`http://127.0.0.1:8000/api/Userlist/${ownerData.username}`, {
			method: 'PUT',
			body: JSON.stringify({
				username: ownerData.username,
				password: ownerData.password,
				bio: in1,
				pfpSrc: document.querySelector('form.editProfile > #pfpSrc').value
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => {
			setUpd(!upd);
			CloseForm(e);
		})
	}
	return (
		<div className='profile'>
			<div className='pfp'></div>
			<div>{ownerData.username}</div>
			<div>{ownerData.bio}</div>
			<form className='editProfile'>
				<input id='bio'></input>
				<input id='pfpSrc'></input>
				<button onClick={Upload}>Save Changes</button>
				<button onClick={CloseForm}>Cancel</button>
			</form>
			{userOnPage == profileOwner && <button onClick={OpenForm}>Edit Info</button>}
			<button onClick={CloseProfile}>Close</button>
		</div>
	);
}

export default Profile;