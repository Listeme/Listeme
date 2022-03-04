import { Stack, Input,Button,useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddTask({ addTask }) {
const toast = useToast()
const [value, setValue] = useState("")

function handleSubmit(e){
    e.preventDefault();

if(value === ''){
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
    text: value,
    date: value
}

addTask(task)
setValue('')

}
    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
            <Input
            mt={5} 
            value={value} 
            variant="outline" 
            type="text" 
            placeholder="Enter Task"
            onChange={(e)=>setValue(e.target.value)} />
            
            <Input
            mt={5} 
            value={value} 
            variant="outline" 
            type="text" 
            placeholder="Due Date"
            onChange={(e)=>setValue(e.target.value)} />

            <Button colorScheme="teal" type="submit">Add Task</Button>
        </Stack>
        </form>
        
    )
}

export default AddTask