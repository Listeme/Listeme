import React, {useEffect, useState} from 'react';
import {Box} from "@chakra-ui/react";
import {gql, useLazyQuery} from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import './Calendar.css';
// import 'react-calendar/dist/Calendar.css';

const GET_TASKS = gql`
  query Tasks {
    tasks{
      name
      completed
      endDate
      subtasks {
        name
      }
      user {
        email
      }
    }
  }`;

  

// code borrowed from online 
function MakeCalendar() {
  
  const [tasks, setTasks] = useState([]);
  const [getTask, { loading, error, data }] = useLazyQuery(GET_TASKS);

  async function taskInfo() {
    let taskInfos = await getTask();
    return taskInfos;
  }

  useEffect(() => {
    getTask().then(res => {
      // console.log(res);
      console.log("Tasks retrieved");
      let tasks = res.data.tasks;
      let now = new Date();
      console.log(now);
      // let taskFiltered = tasks.filter(task => task.completed === false && task.endDate === now);
      console.log(tasks);
      setTasks(tasks);
    });
  }, []);

  const [date, setDate] = useState(new Date());

  console.log(loading);

  return (
    <div className='app'>
      
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <div>
        <span >Selected Date:</span>{' '}
        {date.toDateString()}
      </div>

      <div>
      <h1>Tasks due today</h1>
      {tasks.map(task => (
        <div key={task.id}>
          <p>{task.name}</p>
          <p>{task.subtasks}</p>
          <p>{task.notes}</p>
        </div>
      ))}
      </div>
    </div>

    
  );
}

export default MakeCalendar;