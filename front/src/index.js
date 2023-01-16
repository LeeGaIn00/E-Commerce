import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// service
import App from './App';
import { AuthContextProvider } from './service/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <AuthContextProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AuthContextProvider>
  </>
);


