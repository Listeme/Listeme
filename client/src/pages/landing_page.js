import { Box } from "@chakra-ui/react";
import React from "react";
import About from "../components/sections/About";
import Navbar from "../components/Navbar";
import Features from "../components/sections/Features";

export default function LandingPage() {
  return(
	<Box id="home">
		<Navbar/>
		<About/>
		<Features/>
	</Box>
	
  	
  
  );
}

