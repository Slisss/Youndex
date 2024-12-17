import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({userOnPage}) {
	let [allEvents, setEvents] = useState([]);
	let [eventCount, setEventCount] = useState(0);
	
	let [newEventId, setNewEventId] = useState(0);
	let [editingEvent, setEditingEvent] = useState({});
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Eventcount')
		.then(res => res.json())
		.then(res => setNewEventId(res.id__max+1))
	}, [eventCount])
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/Eventlist')
		.then(response => response.json())
		.then(events => {
			setEvents(events.filter((event) => event.author == userOnPage));
			setEventCount(events.length);
		})
	}, [eventCount, userOnPage]);
	
	function Create(e) {
		e.preventDefault();
		
		let in1 = document.querySelector('form.newEvent > #title').value;
		let in2 = document.querySelector('form.newEvent > #start').value;
		let in3 = document.querySelector('form.newEvent > #end').value;
		
		if (in1 == '' || in2 == '' || in3 == '') { window.alert('all fields must not be empty'); return; }
		if (in1.length > 200)  { window.alert('title exceed allowed length'); return; }
		
		console.log({
				id: newEventId,
				author: userOnPage,
				title: in1,
				start: in2,
				end: in3
			});
		fetch('http://127.0.0.1:8000/api/Eventlist', { 
			method: 'POST',
			body: JSON.stringify({
				id: newEventId,
				author: userOnPage,
				title: in1,
				start: in2,
				end: in3
			}),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		.then(res => { setEventCount(eventCount + 1); CloseForm(e, 'newEvent'); })
	}
	
	function OpenForm(selector) {
		document.querySelector('form.'+selector).style.display = 'block';
	}
	function CloseForm(e, selector) {
		e.preventDefault();
		document.querySelector('form.'+selector).style.display = 'none';
	}
	return (
		<div className='calendar'>
			<FullCalendar
				plugins={[ dayGridPlugin, interactionPlugin ]}
				initialView="dayGridMonth"
				editable={true}
				events={allEvents}
			/>
			<button id='newEvent' onClick={() => { OpenForm('newEvent'); }}>New Event</button>
			<form className='newEvent'>
				<h1>Create Event</h1>
				<label>Title</label><br/>
				<input id='title' max='200'></input><br/>
				<label>Start Date</label><br/>
				<input id='start' type='date'></input><br/>
				<label>End Date</label><br/>
				<input id='end' type='date'></input>
				<div className='controls'>
					<button onClick={Create}>Upload</button>
					<button onClick={(e) => { CloseForm(e, 'newEvent'); }}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
export default Calendar;