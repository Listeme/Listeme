import './Tasks.css';
import {  VStack,Text } from "@chakra-ui/react"
import {useState} from 'react'
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

function Tasks() {
 
  const tasksList = [
    { id: 1, text: 'Finish Listeme', date: '2022-04-08'},
    { id: 2, text: 'CSC301 A2', date: '2022-04-04'},
    { id: 3, text: 'Be Awesome', date: '2022-12-25'}
  ];
  
  const [tasks, setTasks] = useState(tasksList);
  
  
  function deleteTask(id){
  const newTasks = tasks.filter((item)=> {
    return item.id !== id 
  })
  setTasks(newTasks)
  console.log(newTasks)
  }
  
  function addTask(newTask){
  setTasks([...tasks,newTask])
  }
  
  function editTask(id,updatedTask){
  const updatedItem = tasks.map((task) => {
      return task.id === id ? updatedTask : task;
    });
  setTasks(updatedItem)
  }
  
  
  
    return (
      <VStack p={8}>
      
      <Text> Taskbar goes here
      </Text>
         
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask}/>
      <AddTask addTask={addTask}/>
  
      </VStack>
    );
  }
  
  export default Tasks;