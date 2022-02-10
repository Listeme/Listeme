import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SettingContextProvider from './context/SettingContext';

ReactDOM.render(
  <SettingContextProvider>
    <App />
  </SettingContextProvider>,
  document.getElementById('root')
);
