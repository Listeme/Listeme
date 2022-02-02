import React from "react";
import "./landing_page.css";
import Button from "../components/button";

export default function LandingPage(props) {
	return (
		<div>
			<div class="flex-container">
				<Button handler={login_handler}>Login</Button>
				<Button handler = {singup_handler}>Signup</Button>
			</div>
		</div>
	);
}

// Function redirects page to login
function login_handler() {
	window.location.href = "/login";
}

// Function redirects page to singup
function singup_handler() {
	window.location.href = "/signup";
}
