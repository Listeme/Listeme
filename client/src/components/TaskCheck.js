import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'


function TaskCheck({ task, editTask }) {
    return(task.done ? <CheckIcon cursor= "pointer" color="green.500" mr="2" onClick={()=>
                        editTask(task.id,{id: task.id, text: task.text, date: task.date, done: !task.done})} /> :
                       <CloseIcon cursor= "pointer" color="red.500" mr="2" onClick={()=>
                        editTask(task.id,{id: task.id, text: task.text, date: task.date, done: !task.done})} />)
}

export default TaskCheck