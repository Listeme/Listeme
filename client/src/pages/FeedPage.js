import React from "react";
import {HStack, Button } from "@chakra-ui/react";

function FeedPage() {
	return (
   
		<HStack spacing={10}direction='row' justifyContent='center'>
	 
		<Button colorScheme='green' ml="10">Feed</Button>
		<Button colorScheme='green' ml="10">Pomodoro</Button>
		<Button colorScheme='green' ml="10">Journal</Button>
		<Button colorScheme='green' ml="10">Calendar </Button>
		<Button colorScheme='green' ml="10">Notes</Button>
		<Button colorScheme='green' ml="10">Tasks</Button>
		<Button colorScheme='green' ml="10">Signout</Button> 
  
		
	  </HStack>
  
  
	);
}

export default FeedPage;
