import { HStack, VStack,Text, Flex, Badge,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon} from '@chakra-ui/icons'
import React,{useState} from 'react'


function TaskList({ tasks, deleteTask, editTask }) {
const [task, setTask] = useState(""); 
const [modalValue, setModalValue] = useState({})
const [isOpen,setIsOpen] = useState(false)   

function onClose(){
    setIsOpen(false)
  }

function handleEditClick(task){
    setIsOpen(true)
// we've set the passed task to modal value
    setModalValue(task)
    console.log(task)
}

function handleEditInputChange(e,id){
 
setModalValue({ ...modalValue, text: e.target.value });
console.log(modalValue,id) 
}

function handleEditSubmit(e){
  e.preventDefault();
 
  editTask(modalValue.id,modalValue)
  setModalValue("")
  setIsOpen(false)
}

    return (

       !tasks.length ? 
       <Badge 
       colorScheme="purple" 
       variant="outline"
       borderRadius="4"
       p='4' m='5'
       >All Tasks Completed!</Badge> 
       : (
        <VStack>
        {tasks.map((task) => (
            
            <HStack spacing="24px" w="420px">
                <Flex p={6} w="420px" h="50px" justifyContent="space-between">
                <Text>{task.text}</Text>
                <Text>{task.date}</Text>
          
                <Flex w="10px" >
                
                <DeleteIcon color="red.500" mr="2" onClick={()=>deleteTask(task.id)}/>
                <EditIcon onClick={()=>handleEditClick(task)} />
                 
                </Flex>
                
            {/* modal for editing a task */}
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleEditSubmit}>
            <ModalBody>
            <Input   
            value={modalValue.text} 
            key={modalValue.id}
            variant="outline" 
            type="text" 
            placeholder="Update your Task..."
            onChange={handleEditInputChange} />
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
            </Button>
            <Button type="submit" colorScheme="teal" mr={3}>
            Update
            </Button>
            </ModalFooter>
          </form>
          
          </ModalContent>
          </Modal>
         

        </Flex> 
  
            </HStack>  
            
            ))} 
          
        </VStack>
        ) 
        ) 
    
    }   


export default TaskList