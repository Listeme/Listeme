import { useState } from 'react';
import {gql, useQuery} from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import './Calendar.css';
// import 'react-calendar/dist/Calendar.css';

const GET_TASKS = gql`
    query Tasks($where: TaskWhere) {
      tasks(where: $where) {
        endDate
        name
        user {
          email
        }
      }
    }
`; 

// code borrowed from online 
function MakeCalendar() {
  const [date, setDate] = useState(new Date());

  let navigate = useNavigate();

  // const [tasks, { d }] = useQuery(GET_TASKS); 
  // async function onClickDate(values) {
  //   ;
  // }

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