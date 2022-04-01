import React, {useEffect, useState} from 'react';
import {Box, useColorModeValue} from "@chakra-ui/react";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import "./feed-components.css";
import Timer  from '../components/Timer';



export default function PomoTasks() {

  const bg = useColorModeValue('gray.300', 'gray.500');
  const [tasks, setTasks] = useState([]);

  const QUERY_USER = `
    query Users($where: UserWhere) {
      users(where: $where) {
        id
        name
        email
      }
    }
  `

  const QUERY_POMODORO = `
    query Query {
        pomodoros {
            endTime
            id
            startTime
            lastModified
            task {
                id
            }
        }
    }
  `

  // const [getUserInfo] = useLazyQuery(gql(QUERY_USER));
  const [getPomodoroInfo] = useLazyQuery(gql(QUERY_POMODORO));

  async function pomodoroInfo(values) {
    let pomodoroInfo = await getPomodoroInfo();
    return pomodoroInfo;
  }
  
  function changeTimer(id){
  }

  useEffect(() => {
    pomodoroInfo().then(res => {
      console.log(res.data.pomodoros);
      let pomodoroUnfiltered = res.data.pomodoros;
      console.log(pomodoroUnfiltered);
      setTasks(pomodoroUnfiltered);
    });
  }, []);

  return (
    <Box
      bg={bg}
      width="100%"
      height="100%"
    >
      <div class="cardDiv">
        <h1>Pomodoro list</h1>
        {tasks.map(task => (
          <div key={task.id} onClick={changeTimer(task.id)}>
            <p>{task.startDate}</p>
            <p>{task.endDate}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}