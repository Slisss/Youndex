import React, { useState, useEffect } from 'react';

function NewPost({userOnPage, postCount, setPostCount, dict, CheckDict}) {
	let [newPostId, setNewPostId] = useState(0);
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Postcount')
		.then(res => res.json())
		.then(res => setNewPostId(res.id__max+1))
	}, [postCount])
	
	function OpenForm() {
		document.querySelector('form.newPost').style.display = 'block';
	}
	function CloseForm() {
		document.querySelector('form.newPost').style.display = 'none';
		document.querySelector('form.newPost > #newPost').value = '';
	}
	
	function Tweet(e) {
		e.preventDefault();
		let in1 = document.querySelector('form.newPost > #newPost').value;
		
		if (CheckDict(in1, dict)) { window.alert('bad language'); return; }
		if (in1.length > 140) { window.alert('too many characters'); return; }
		
		fetch('http://127.0.0.1:8000/api/Postlist', { 
			method: 'POST',
			body: JSON.stringify({
				id: newPostId,
				author: userOnPage,
				desc: in1,
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => { setPostCount(postCount + 1); CloseForm() })
	}
	
	return (
		<div>
			<form className='newPost'>
				<h1>{userOnPage + ' says:'}</h1>
				<textarea id='newPost' required></textarea>
				<div className='controls'>
					<button onClick={Tweet}>Tweet</button>
					<button onClick={CloseForm}>Discard</button>
				</div>
			</form>
			<div className='newPost' onClick={OpenForm}>+</div>
		</div>
	);
}

export default NewPost;