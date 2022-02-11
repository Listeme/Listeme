import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SettingContextProvider from './context/SettingContext';
import theme from './theme';


ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <SettingContextProvider>
      <App />
    </SettingContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

