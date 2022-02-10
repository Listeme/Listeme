import React from 'react';
import LandingPage from './Pages/landing_page';
import LoginPage from './Pages/login_page';
import SignupPage from './Pages/signup_page';
import ForgotPasswordPage from './Pages/forgot_password';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ToggleColorMode from './components/ColorMode';
import font_theme from './font_theme';


function App() {
  return (
    <ChakraProvider theme={font_theme}>      
      <ToggleColorMode/>    
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
          <Route path="*"
          element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
