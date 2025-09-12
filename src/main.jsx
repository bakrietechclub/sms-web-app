import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './font.css';
import { Provider } from 'react-redux';
import { store } from './states/index';
import { BrowserRouter } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
