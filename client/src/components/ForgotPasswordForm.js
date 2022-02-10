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

function ForgotPasswordForm() {
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
            <Heading size="md">Forgot Password</Heading>
          </Box>
          <Box>
            <form>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                />
              </FormControl>

              <Box my={4}>
                <Button width="full" type="submit">
                  Send Email
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default ForgotPasswordForm