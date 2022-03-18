import { React } from "react";
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
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";

import { AiFillHome, AiFillCalendar, AiOutlineMenu } from "react-icons/ai";
import { RiTimerFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { BsListCheck } from "react-icons/bs";

export default function FeedBar() {
  const bg = useColorModeValue("gray.100", "gray.800");
  const cl = useColorModeValue("gray.800", "white");
  const text = useColorModeValue("black", "white");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Buttons = (
      <>
      <Button
        bg={bg}
        color="gray.500"
        display="inline-flex"
        alignItems="center"
        fontSize="md"
        _hover={{ color: cl }}
        _focus={{ boxShadow: "none" }}
        textColor={text}
        leftIcon={<AiFillHome />}
      >
        Feed
      </Button>
      <Button
        bg={bg}
        color="gray.500"
        display="inline-flex"
        alignItems="center"
        fontSize="md"
        _hover={{ color: cl }}
        _focus={{ boxShadow: "none" }}
        textColor={text}
        leftIcon={<AiFillCalendar />}
      >
        Calendar
      </Button>
      <Button
        bg={bg}
        color="gray.500"
        display="inline-flex"
        alignItems="center"
        fontSize="md"
        _hover={{ color: cl }}
        _focus={{ boxShadow: "none" }}
        textColor={text}
        leftIcon={<RiTimerFill />}
      >
        Pomodoro
      </Button>
      <Button
        bg={bg}
        color="gray.500"
        display="inline-flex"
        alignItems="center"
        fontSize="md"
        _hover={{ color: cl }}
        _focus={{ boxShadow: "none" }}
        textColor={text}
        leftIcon={<BsListCheck />}
      >
        To-do List
      </Button>
      <Button
        bg={bg}
        color="gray.500"
        display="inline-flex"
        alignItems="center"
        fontSize="md"
        _hover={{ color: cl }}
        _focus={{ boxShadow: "none" }}
        textColor={text}
        leftIcon={<GiNotebook />}
      >
        Journal
      </Button>
      </>
  );
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
        {Buttons}
    </VStack>
  );
  return (
    <chakra.div
      id="feedbar"
      h="4.5rem"
      mx="auto"
      position={"sticky"}
      top={0}
      left={0}
      right={0}
      backgroundColor={bg}
      zIndex={100}
    >
      {MobileNavContent}
      <Flex
        w="full"
        h="full"
        px={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align={"flex-start"}>
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            fontSize="20px"
            color={useColorModeValue("gray.800", "inherit")}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={mobileNav.onOpen}
          />
          <HStack>
            <Box>
              <Image
                src="https://cdn.discordapp.com/icons/931373253656707113/4a35783fbff7c0772d31719b220c9802.webp?size=96"
                borderRadius="full"
                boxSize="50px"
              />
            </Box>
          </HStack>
        </Flex>

        <Flex>
          <HStack
            spacing="3"
            display={{ base: "none", md: "flex" }}
            alignItems={"center"}
          >
            {Buttons}
          </HStack>
        </Flex>
        <Flex>
          <HStack display="flex" spacing={3} alignItems="center">
            <Menu isOpen={isOpen}>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn.dribbble.com/users/1039155/screenshots/4138700/zombiegamecharacters_still_2x.gif?compress=1&resize=400x300"
                  }
                />
              </MenuButton>
              <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={
                      "https://cdn.dribbble.com/users/1039155/screenshots/4138700/zombiegamecharacters_still_2x.gif?compress=1&resize=400x300"
                    }
                    boxShadow="lg"
                  />
                </Center>
                <br />
                <Center>
                  <chakra.p>Username</chakra.p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </chakra.div>
  );
}
