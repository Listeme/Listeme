import React from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    // FormHelperText,
    Text,
  } from "@chakra-ui/react";

export default function LoginForm() {
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
                <Heading size="md">Login</Heading>
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
                      Login
                    </Button>
                  </Box>
                  <Link
                    onClick={() => {
                      window.location.href = "/signup";
                    }}
                  >
                    <Box my={4}>
                      <Button width="full">Create An Account</Button>
                    </Box>
                  </Link>
                </form>
                <Box textAlign="center">
                  <Link onClick={() => {
                      window.location.href = "/forgotpassword";
                    }}>
                    <Text>Forgot my password</Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      );
}

