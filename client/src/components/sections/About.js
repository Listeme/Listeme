import React from "react";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  chakra
} from "@chakra-ui/react";
import Card from "../Card";


function About() {
    const bg = useColorModeValue('gray.600', 'gray.500');
    return (
        <chakra.div mx="auto">
        <Box w="full" px="200px" py="60px" mb="120px" bg={bg}>
          <Flex justifyContent="space-between" alignItems="center" pb="80px">
            <Heading fontSize={54} letterSpacing="6px" textAlign="center">
              All in one <br /> PRODUCTIVITY APP
            </Heading>
            <Box maxW="300px">
                <Card title="Listeme" pb="20px">
                Listeme is an all-in-one productivity app. The app features various synchronizations across multiple features. 
                Rather than having to navigate the G suite or Microsoft Office for all your needs, this app eliminates the option 
                of the navigation by giving users all the features in one place.
                </Card>
            </Box>
          </Flex>
        </Box>
        </chakra.div>
      );
}

export default About;
