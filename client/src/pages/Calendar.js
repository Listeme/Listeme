import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
// import 'react-calendar/dist/Calendar.css';

// code borrowed from online 
function MakeCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <div>
        <span >Selected Date:</span>{' '}
        {date.toDateString()}
      </div>
    </div>
  );
}

export default MakeCalendar;