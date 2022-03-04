import React  from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { login_handler, signup_handler } from "./handlers";
import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
  Link,
  Icon,
  chakra,
  SimpleGrid,
  CloseButton,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton
} from "@chakra-ui/react";

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue("brand.600", "brand.50");
    const hbg = useColorModeValue("gray.50", "brand.400");
    const tcl = useColorModeValue("gray.900", "gray.50");
    const dcl = useColorModeValue("gray.500", "gray.50");
    return (
      <Link
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{ bg: hbg }}
      >
        <Icon
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d={props.icon} />
        </Icon>
        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Link>
    );
  };

  const sections = [
    {
      title: "Pomodoro",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      description: "A clock that is used to help with productivity.",
    },
    {
      title: "Todo List",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      description: "A todo list that helps you keep track of your tasks.",
    },
    {
      title: "Calendar",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      description: "A calendar that helps you keep track of your events.",
    },
  ];

  const Features = (props) => {
    return (
      <React.Fragment>
        <SimpleGrid
          columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
          pos="relative"
          gap={{ base: 6, sm: 8 }}
          px={5}
          py={6}
          p={{ sm: 8 }}
        >
          {sections.map(({ title, icon, description }, sid) => (
            <Section title={title} icon={icon} key={sid}>
              {description}
            </Section>
          ))}
        </SimpleGrid>
      </React.Fragment>
    );
  };

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
      <Button w="full" variant="ghost">
        About Us
      </Button>
      <Button w="full" variant="ghost" onClick={signup_handler}>
        Sign Up
      </Button>
      <Button w="full" variant="ghost" onClick={login_handler}>
        Sign In
      </Button>
    </VStack>
  );
  return (
      <chakra.div h="4.5rem" mx="auto" maxW="1200px">
        <Flex
          w="full"
          h="full"
          px="6"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="flex-start">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <HStack>
                <Box>
					<chakra.p>
						<chakra.h1 fontSize="md" color= "white" _hover={{color: cl}}>
							Listeme
						</chakra.h1>
					</chakra.p>
				</Box>
              </HStack>
            </Link>
          </Flex>
          <Flex>
            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              <Button
                bg={bg}
                color="gray.500"
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                _hover={{ color: cl }}
                _focus={{ boxShadow: "none" }}
              >
                About us
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<IoIosArrowDown />}
                  >
                    Features
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  w="100vw"
                  maxW="md"
                  _focus={{ boxShadow: "md" }}
                >
                  <Features />
                </PopoverContent>
              </Popover>
            </HStack>
          </Flex>
          <Flex justify="flex-end" align="center" color="gray.400">
            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              <Button
                colorScheme="brand"
                variant="ghost"
                size="sm"
                onClick={login_handler}
              >
                Sign in
              </Button>
              <Button
                colorScheme="brand"
                variant="ghost"
                size="sm"
                onClick={signup_handler}
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
