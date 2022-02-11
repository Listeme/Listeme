import React from 'react';
import LandingPage from './pages/landing_page';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import ForgotPasswordPage from './pages/forgot_password';
import FeedPage from './pages/FeedPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ToggleColorMode from './components/ColorMode';
import font_theme from './font_theme';
import TimerPage from './pages/TimerPage';


function App() {
  return (
       
         
      <BrowserRouter>
        <Routes>          
          <Route path="/" element={<ChakraProvider theme={font_theme}> <ToggleColorMode/>  <LandingPage /> </ChakraProvider>} />
          <Route path="/login" element={<ChakraProvider theme={font_theme}> <ToggleColorMode/>  <LoginPage /> </ChakraProvider>} />
          <Route path="/signup" element={<ChakraProvider theme={font_theme}> <ToggleColorMode/>  <SignupPage /> </ChakraProvider>} />
          <Route path="/forgotpassword" element={<ChakraProvider theme={font_theme}> <ToggleColorMode/>  <ForgotPasswordPage/> </ChakraProvider>} />
          <Route path="/timer" element={<TimerPage/>} />
          <Route path="/feed" element={<FeedPage/>} />
          <Route path="*"
          element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
