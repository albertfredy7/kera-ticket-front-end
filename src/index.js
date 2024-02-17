import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './ContextShare/ContextShare';
import { AuthContextProvider } from './ContextShare/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextShare><BrowserRouter><AuthContextProvider><App /></AuthContextProvider></BrowserRouter></ContextShare>
  </React.StrictMode>
);


