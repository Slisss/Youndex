import React, { useState, useEffect } from 'react';
import Post from './Post';
import NewPost from './NewPost';

function News({ userOnPage, setProfileOwner, ShowProfile, dict, CheckDict }) {
	let [allPosts, setPosts] = useState([]);
	let [postCount, setPostCount] = useState(0);
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Postlist')
		.then(response => response.json())
		.then(posts => {
			setPosts(posts);
			setPostCount(posts.length);
		})
	}, [postCount]);
	
	function OpenForm() {
		document.querySelector('form.newPost').style.display = 'block';
	}
	
	return (
		<div className='news'>
			{allPosts.map((p) =>
				<Post
					key={p.id}
					post={p}
					userOnPage={userOnPage}
					postCount={postCount}
					setPostCount={setPostCount}
					setProfileOwner={setProfileOwner}
					ShowProfile={ShowProfile}
					dict={dict}
					CheckDict={CheckDict}
				/>
			)}
			<NewPost
				userOnPage={userOnPage}
				postCount={postCount}
				setPostCount={setPostCount}
				dict={dict}
				CheckDict={CheckDict}
			/>
			<div className='newPost' onClick={OpenForm}></div>
		</div>
	);
}
export default News;