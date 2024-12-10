import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
	return (
		<div className='calendar'>
			<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
			/>
		</div>
	);
}
export default Calendar;