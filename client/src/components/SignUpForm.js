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

import {gql, useMutation} from '@apollo/client';
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SIGN_UP = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
        signUp(name: $name, email: $email, password: $password)
    }
`;

export default function SignupForm() {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm();

    let navigate = useNavigate();

    const [signUp, { data }] = useMutation(SIGN_UP);

    async function onSubmitSignUp(values) {
        // const { loading, error, data } = useQuery(SIGN_UP, {
        //     variables: { name: values.name, email: values.email, password: values.password }
        // });
        signUp({ variables: { name: values.name, email: values.email, password: values.password } }).then(res => {
            console.log(res.data.signUp);
            localStorage.setItem('token', res.data.signUp);
            navigate('/');
        });
    }

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
                <form onSubmit={handleSubmit(onSubmitSignUp)}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="name"
                      placeholder="Enter Your Name"
                      {...register("name", {
                          required: "This is required",
                      })}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      {...register("email", {
                          required: "This is required",
                      })}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      {...register("password", {
                          required: "This is required",
                      })}
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