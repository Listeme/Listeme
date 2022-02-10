import React from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    // Link,
    // FormHelperText,
    // Text,
  } from "@chakra-ui/react";

export default function SignupForm() {
	return (
        <Flex
          minHeight="100vh"
          width="full"
          justifyContent="center"
          alignItems="center"
          
        >
          <Box>
            <Box
              borderWidth={1}
              px={8}
              py={8}
              borderRadius={4}
              boxShadow="lg"
              width="full"
              maxWidth="1000px"           
            >
              <Box textAlign="center" mb={4}>
                <Heading size="md">Signup</Heading>
              </Box>
              <Box>
                <form>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="name"
                      placeholder="Enter Your Name"
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                    />
                    {/* <FormHelperText>
                      Please ensure you have verified via email. If you don't see
                      the email, please re-register.
                    </FormHelperText> */}
                  </FormControl>
    
                  <Box my={4}>
                    <Button width="full" type="submit">
                      Sign Up
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Flex>
      );
}