import { Box, chakra } from '@chakra-ui/react';
import React from 'react'
import About from './sections/About';

function Landing() {
  return (
    <chakra.div mx="auto">
        <Box>
            <About/>
        </Box>
    </chakra.div>
    
  );
}

export default Landing