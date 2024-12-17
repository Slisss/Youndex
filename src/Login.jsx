import React, { useState, useEffect } from 'react';

function Login({setUserOnPage, setLoggedIn, dict, CheckDict}) {
	let [allUsers, setUsers] = useState([]);
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Userlist')
		.then(response => response.json())
		.then(users => {
			setUsers(users);
		})
	}, []);
	
	function TryLogin(e) {
		e.preventDefault();
		let in1 = document.querySelector('form.loginReg > #username').value;
		let in2 = document.querySelector('form.loginReg > #password').value;
		if (!allUsers.some(u => u.username == in1 && u.password == in2)) { window.alert('wrong info'); return; }
		
		setUserOnPage(in1);
		setLoggedIn(1);
	}
	function TryRegister(e) {
		e.preventDefault();
		
		let in1 = document.querySelector('form.loginReg > #username').value;
		let in2 = document.querySelector('form.loginReg > #password').value;
		
		if (allUsers.some(u => u.username == in1)) { window.alert('username taken'); return; }
		if (CheckDict(in1, dict)) { window.alert('bad language'); return; }
		
		fetch('http://127.0.0.1:8000/api/Userlist', { 
			method: 'POST',
			body: JSON.stringify({
				username: in1,
				password: in2,
				bio: 'Add bio',
				pfpSrc: 'https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg'
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		
		setUserOnPage(in1);
		setLoggedIn(1);
	}
	return (
		<form className='loginReg'>
			<input id='username'></input>
			<input id='password'></input>
			<button onClick={TryLogin}>login</button>
			<button onClick={TryRegister}>register</button>
		</form>
	);
}

export default Login;