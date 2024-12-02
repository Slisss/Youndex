import React, { useState, useEffect } from 'react';
import Login from './Login';
import Post from './Post';
import Profile from './Profile';
import NewPost from './NewPost';

function Body() {
	let [userOnPage, setUserOnPage] = useState('');
	let [loggedIn, setLoggedIn] = useState(0);

	let [allPosts, setPosts] = useState([]);
	let [postCount, setPostCount] = useState(0);

	let [profileOwner, setProfileOwner] = useState('');
	
	let dictionary = ['qawsed', 'zxc'];
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Postlist')
		.then(response => response.json())
		.then(posts => {
			setPosts(posts);
			setPostCount(posts.length);
		})
	}, [postCount]);

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
			{loggedIn ? allPosts.map((p) =>
				<Post
					post={p}
					userOnPage={userOnPage}
					postCount={postCount}
					setPostCount={setPostCount}
					setProfileOwner={setProfileOwner}
					ShowProfile={ShowProfile}
					dict={dictionary}
					CheckDict={CheckDict}
				/>
			) : ''}
			{loggedIn ? <Profile
				userOnPage={userOnPage}
				profileOwner={profileOwner}
				dict={dictionary}
				CheckDict={CheckDict}
			/>
			: ''}
			{loggedIn ?
				<NewPost
					userOnPage={userOnPage}
					postCount={postCount}
					setPostCount={setPostCount}
					dict={dictionary}
					CheckDict={CheckDict}
				/>
			: ''}
		</div>
	);
}

export default Body;