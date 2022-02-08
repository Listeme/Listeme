import React from 'react';
import LandingPage from './landing_page/landing_page';
import LoginPage from './login_page/login_page';
import SignupPage from './signup_page/signup_page';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<ChakraProvider><LoginPage /></ChakraProvider>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="*"
          element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
