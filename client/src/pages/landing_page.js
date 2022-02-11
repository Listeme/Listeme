import React from "react";
import { Flex, Box, Spacer, Button, useColorModeValue} from "@chakra-ui/react";

export default function LandingPage(props) {
	const cs = {background: "#555b6e",
		fontSize: "20px",
		marginTop: "10px",
		borderRadius: "25px",
		transition: "0.2s ease-in",
		cursor: "pointer",
		padding: "7px 10px",
		color: "white",
		boxShadow: "0 8px #999",
		marginRight: "25px",
		fontWeight: "normal",
	};
	const hov = {bg: "#333131"};
	const flex_css = {
		display: "flex",
		flexFlow: "row",
		justifyContent: "flex-start",
	};
	const bg = useColorModeValue('red.300', 'orange.200');
	return (
		<Box h="100vh" w="full" bg={bg}>		
			<Flex css={flex_css}>
				<Spacer />
				<Box>
					<Button css={cs} onClick={signup_handler} _hover = {hov}>
					Sign Up
					</Button>
					<Button css={cs} onClick={login_handler} _hover = {hov}>Log in</Button>
				</Box>
			</Flex>	
		</Box>		
	);
}

// Function redirects page to login
function login_handler() {
	window.location.href = "/login";
}

// Function redirects page to singup
function signup_handler() {
	window.location.href = "/signup";
}
