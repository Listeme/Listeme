import React from "react";
import {
  Flex,
  Box,
  SimpleGrid,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

function Features() {
    const boxBg = useColorModeValue("gray.900", "gray.400");
    const pColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={20}
      w="full"
      justifyContent="center"
      alignItems="center"
      id="features"
    >
      <Box
        shadow="xl"
        bg={useColorModeValue("white", "gray.800")}
        px={8}
        py={20}
        mx="auto"
      >
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, md: 2 }}
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box>
            <chakra.h2
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
              color={boxBg}
              lineHeight={{ md: "shorter" }}
              textShadow="2px 0 currentcolor"
            >
              Calendar
            </chakra.h2>
            <chakra.p
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={pColor}
              fontSize={{ md: "lg" }}
            >
              The calendar allows you to see the notes that you have created on
              the given day, and shows the tasks that you have created/completed
              on the day.
            </chakra.p>
          </Box>
            <Box
              w="full"
              h="full"
              py={48}
              backgroundPosition={"center center"}
              backgroundSize={"cover"}
              backgroundImage={
                "url(https://images.unsplash.com/photo-1558025137-0b406e9cc169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)"
              }
            ></Box>
        </SimpleGrid>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2 }}
          flexDirection="column-reverse"
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box order={{ base: "none", md: 2 }}>
            <chakra.h2
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
              color={boxBg}
              lineHeight={{ md: "shorter" }}
            >
              Pomodoro timer
            </chakra.h2>
            <chakra.p
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={pColor}
              fontSize={{ md: "lg" }}
            >
              This allows you to set the time for the pomodoro technique and
              also integrates the task's that you have listed for the day.
            </chakra.p>
          </Box>
          <Box
            w="full"
            h="full"
            py={48}
            backgroundPosition={"center center"}
            backgroundSize={"cover"}
            backgroundImage={
              "url(https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
            }
          />
        </SimpleGrid>
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, md: 2 }}
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box>
            <chakra.h2
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
              color={boxBg}
              lineHeight={{ md: "shorter" }}
              textShadow="2px 0 currentcolor"
            >
              Notes
            </chakra.h2>
            <chakra.p
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={pColor}
              fontSize={{ md: "lg" }}
            >
              This allows you to create notes and also allows you to edit and
              delete the notes that you have created.
            </chakra.p>
          </Box>
          <Box
            w="full"
            h="full"
            py={48}
            backgroundPosition={"center center"}
            backgroundSize={"cover"}
            backgroundImage={
              "url(https://images.unsplash.com/photo-1612367980327-7454a7276aa7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
            }
          ></Box>
        </SimpleGrid>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2 }}
          flexDirection="column-reverse"
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box order={{ base: "none", md: 2 }}>
            <chakra.h2
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
              color={boxBg}
              lineHeight={{ md: "shorter" }}
            >
              To-do List
            </chakra.h2>
            <chakra.p
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={pColor}
              fontSize={{ md: "lg" }}
            >
              This allows you to create tasks and also allows you to edit and
              delete the tasks that you have created.
            </chakra.p>
          </Box>
          <Box
            w="full"
            h="full"
            py={48}
            backgroundPosition={"center center"}
            backgroundSize={"cover"}
            backgroundImage={
              "url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)"
            }
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Features;
