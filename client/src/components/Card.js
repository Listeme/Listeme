import React from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";


function Card(props) {
  return (
    <Box w="100%">
        <Box
          w="full"
          borderRadius="lg"
          borderWidth="0.1rem"
          overflow="hidden"
          borderColor='black.100'
        >
          <Box p={6}>
            <Heading fontSize={20} letterSpacing="1px" pb="20px" textAlign='center'>
                {props.title}
            </Heading>
            <Text pb={props.pb} textAlign='center'>
              {props.children}
            </Text>
          </Box>
        </Box>
    </Box>
  )
}

export default Card