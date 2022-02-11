import React from 'react';
import LandingPage from './pages/landing_page';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import ForgotPasswordPage from './pages/forgot_password';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ToggleColorMode from './components/ColorMode';
import font_theme from './font_theme';
import TimerPage from './pages/TimerPage';


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
          <Route path="/timer" element={<TimerPage/>} />
          <Route path="*"
          element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
