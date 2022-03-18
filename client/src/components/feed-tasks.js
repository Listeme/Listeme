import React, {useEffect, useState} from 'react';
import {Box, useColorModeValue} from "@chakra-ui/react";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import "./feed-components.css";

export default function FeedTasks() {

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

  const QUERY_TASK = `
    query Query {
      tasks {
        completed
        id
        name
        startDate
        endDate
        lastModified
        subtasks {
          id
        }
      }
    }
  `

  // const [getUserInfo] = useLazyQuery(gql(QUERY_USER));
  const [getTaskInfo] = useLazyQuery(gql(QUERY_TASK));

  async function taskInfo(values) {
    // const { loading, error, data } = useQuery(SIGN_UP, {
    //     variables: { name: values.name, email: values.email, password: values.password }
    // });
    // let userid = userid_from_token();
    // let userinfo = await getUserInfo({
    //   variables: {
    //     "where": {
    //       "id": userid
    //     }
    //   }
    // });
    // console.log(userinfo);
    let taskInfo = await getTaskInfo();
    return taskInfo;
  }

  function in7days(date) {
    let endDate = new Date(date);
    let today = new Date();
    let sevenDays = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return sevenDays > endDate && today < endDate;
  }

  useEffect(() => {
    taskInfo().then(res => {
      console.log(res.data.tasks);
      let taskUnfiltered = res.data.tasks;
      let now = new Date();
      let taskFiltered = taskUnfiltered.filter(task => task.completed === false && in7days(task.endDate));
      console.log(taskFiltered);
      setTasks(taskFiltered);
    });
  }, []);

  return (
    <Box
      bg={bg}
      width="100%"
      height="100%"
    >
      <div class="cardDiv">
        <h1>Upcoming Tasks Due in 7 Days</h1>
        {tasks.map(task => (
          <div key={task.id}>
            <p>{task.name}</p>
            <p>{task.startDate}</p>
            <p>{task.endDate}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}