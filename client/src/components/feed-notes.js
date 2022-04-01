import React from 'react';
import {Box, useColorModeValue} from "@chakra-ui/react";

export default function FeedNotes() {

  const bg = useColorModeValue('gray.300', 'gray.500');

  return (
    <Box
      // bg={bg}
      width="100%"
      height="100%"
    >
      <h1>This is notes</h1>
    </Box>
  )
}