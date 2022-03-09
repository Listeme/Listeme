import { Box } from "@chakra-ui/react";
import React from "react";
import About from "../components/sections/About";
import Navbar from "../components/Navbar";

export default function LandingPage(props) {
  return(
	<Box>
		<Navbar/>
		<About/>
	</Box>
	
  	
  
  );
}

