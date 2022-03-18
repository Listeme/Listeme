import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { login_handler, signup_handler } from "./handlers";
import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
  chakra,
  CloseButton,
  VStack,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import {Link as ScrollLink} from 'react-scroll';



export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const cl = useColorModeValue("gray.800", "white");
  const text = useColorModeValue("black", "white");
  const mobileNav = useDisclosure();

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <ScrollLink to="about" smooth={true} duration={500}>
        <Button w="full" variant="ghost">
          About Us
        </Button>
      </ScrollLink>

      <ScrollLink to="features" smooth={true} duration={500}>
        <Button w="full" variant="ghost">
          Features
        </Button>
      </ScrollLink>

      <Button w="full" variant="ghost" onClick={login_handler}>
        Sign In
      </Button>
      <Button w="full" variant="ghost" onClick={signup_handler} backgroundColor={bg === "white" ? "gray.300" : "purple.500"}>
        Sign Up
      </Button>
    </VStack>
  );
  return (    
    <chakra.div 
      h="4.5rem"
      mx="auto" 
      id="navbar"
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      backgroundColor={bg}
     >
      <Flex
        w="full"
        h="full"
        px="6"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="flex-start">
          <ScrollLink active="active" to="home" smooth={true} duration={500}>
            <HStack>
            <Box>
                <Image
                src="https://cdn.discordapp.com/icons/931373253656707113/4a35783fbff7c0772d31719b220c9802.webp?size=96"
                borderRadius='full'
                boxSize='50px'/>
            </Box>
            </HStack>
          </ScrollLink>
        </Flex>
        <Flex>
          <HStack spacing="3" display={{ base: "none", md: "inline-flex" }}>
            <ScrollLink active="active" to="about" smooth={true} duration={500}>
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
              textColor={text}
            >
              About us
            </Button>
            </ScrollLink>
            
              <ScrollLink active="active" to="features" smooth={true} duration={500}>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: "none" }}
                  textColor={text}
                >
                  Features
                </Button>
                </ScrollLink>
             
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
              textColor={text}
            >
              Contact us
            </Button>
            <Button
              colorScheme="brand"
              variant="ghost"
              size="sm"
              textColor={text}
              onClick={login_handler}
            >
              Sign in
            </Button>
            <Button
              colorScheme="brand"
              backgroundColor={bg === "white" ? "gray.300" : "purple.500"}
              size="sm"
              onClick={signup_handler}
              textColor={text}
            >
              Sign up
            </Button>
              
          </HStack>
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            fontSize="20px"
            color={useColorModeValue("gray.800", "inherit")}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={mobileNav.onOpen}
          />
        </Flex>
      </Flex>
      {MobileNavContent}
    </chakra.div>
  );
}
