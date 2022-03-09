import {React} from "react";
import {
  Flex,
  VStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";


function About() {
  const bgIMG = useColorModeValue(
    'url(https://images.unsplash.com/photo-15x64510714747-69c3bc1fab41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
    'url(https://images.unsplash.com/photo-1596003906949-67221c37965c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80)'
    );
  return (
        <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={bgIMG}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            textAlign={'center'}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            All in one <br /> PRODUCTIVITY APP
          </Text>
        </Stack>
      </VStack>
    </Flex>
      );
}

export default About;
