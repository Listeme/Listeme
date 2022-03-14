import { Stack, Input,Button,useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddTask({ addTask }) {
const toast = useToast()
const [text, setText] = useState("")
const [date, setDate] = useState("")

function handleSubmit(e){
    e.preventDefault();

if(text === ''){
    toast({
        title: "Your task needs a name.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
      return;
    }
const task = {
    id: nanoid(),
    text: text,
    date: date
}

addTask(task)
setText('')
setDate('')

}
    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={5}>

            <Input
            mt={5} 
            value={text} 
            variant="outline" 
            type="text" 
            placeholder="Enter Task"
            onChange={(e)=>setText(e.target.value)} />
            
            <Input
            mt={5} 
            value={date} 
            variant="outline" 
            type="text" 
            placeholder="Due Date"
            onChange={(e)=>setDate(e.target.value)} />

            <Button colorScheme="teal" type="submit">Add Task</Button>
        </Stack>
        </form>
        
    )
}

export default AddTask