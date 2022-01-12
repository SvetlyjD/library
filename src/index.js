import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HeaderMenu } from './Components/Header';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='containerIndex'>
        <div className='appMenu'>
          <App />
        </div>
      </div>
      <div className='headerMenu'>
        <HeaderMenu />
      </div>

    </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


reportWebVitals();
