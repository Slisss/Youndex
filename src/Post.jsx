import React, { useState, useEffect } from 'react';

function Post({post, userOnPage, postCount, setPostCount, setProfileOwner, ShowProfile, dict, CheckDict}) {
	let [authorInfo, setAuthorInfo] = useState({
		username: '',
		pfpSrc: ''
	});
	
	let [l, setL] = useState(false);
	let [d, setD] = useState(false);
	
	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/Userlist/${post.author}`)
		.then(response => response.json())
		.then(authorInfo => {
			setAuthorInfo({
				username: authorInfo.username,
				pfpSrc: authorInfo.pfpSrc
			});
			ApplyPic(authorInfo.pfpSrc);
		})
	}, []);
	
	function ApplyPic(src) {
		document.querySelector(`#p${post.id} > div.pfp`).style.backgroundImage = 'url(' + src + ')';
	}
	function OpenEdit() {
		document.querySelector(`#p${post.id} > form.editPost`).style.display = 'block';
		document.querySelector(`#p${post.id} > form.editPost > #desc`).value = post.desc;
	}
	function ConfirmEdit(e) {
		e.preventDefault();
		let in1 = document.querySelector(`#p${post.id} > form.editPost > #desc`).value;
		
		if (CheckDict(in1, dict)) { window.alert('bad language'); return; }
		if (in1.length > 140) { window.alert('too many characters'); return; }
		
		fetch(`http://127.0.0.1:8000/api/Postlist/${post.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: post.id,
				author: post.author,
				desc: in1,
				date: post.date,
				likes: post.likes
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => {
			setPostCount(postCount - 1);
			setPostCount(postCount + 1);
			CancelEdit(e);
		})
	}
	function Like(incr) {
		if (incr > 0) {
			if (l) { incr *= -1; setL(false); }
			else { if (d) incr *= 2; setL(true); setD(false); }
		}
		else {
			if (d) { incr *= -1; setD(false); }
			else { if (l) incr *= 2; setD(true); setL(false); }
		}
		
		fetch(`http://127.0.0.1:8000/api/Postlist/${post.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: post.id,
				author: post.author,
				desc: post.desc,
				date: post.date,
				likes: post.likes + incr
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => {
			setPostCount(postCount - 1);
			setPostCount(postCount + 1);
		})
	}
	function CancelEdit(e) {
		e.preventDefault();
		document.querySelector(`#p${post.id} > form.editPost`).style.display = 'none';
	}
	function Delete() {
		fetch(`http://127.0.0.1:8000/api/Postlist/${post.id}`, { 
			method: 'DELETE',
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => { console.log(res); setPostCount(postCount - 1); })
	}
	return (
		<div id={'p' + post.id} className='post'>
			<div className='pfp'></div>
			<div className='postData'>
				<p>{post.desc}</p>
				<p>posted on: {post.date}</p>
				<p id='author' onClick={() => {ShowProfile(post.author)}}>by: {post.author}</p>
				<div className='likes'>
					<button onClick={() => Like(1)}>Like{l ? 'd' : ''}</button>
					{post.likes}
					<button onClick={() => Like(-1)}>Dislike{d ? 'd' : ''}</button>
				</div>
				{userOnPage == post.author && 
					<div className='postControls'>
						<button onClick={OpenEdit}>Edit</button>
						<button onClick={Delete}>Delete</button>
					</div>
				}
			</div>
			<form className='editPost'>
				<div id='title'>Edit post:</div>
				<textarea id='desc' required></textarea>
				<div className='controls'>
					<button onClick={ConfirmEdit}>Edit</button>
					<button onClick={CancelEdit}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default Post;