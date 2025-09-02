import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import DhcpApp from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './components/Theme/ThemeProvider';

const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <DhcpApp basePath='/'/>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
