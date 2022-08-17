import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { AppProvider } from './contexts/AppStore';
import { AuthProvider } from './contexts/AuthProvider';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      'Sarabun',
      'Roboto',
      'sans-serif',
    ],
  },
  palette: {
    primary: {
      light: '#80b3ff',
      main: '#0066ff',
      dark: '#003380',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7bcab7',
      main: '#02b4bd',
      dark: '#00848d',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiStepIcon: {
      root: {
        '&$active': {
          color: '#44545c',
        },
      },
      active: {},
      completed: {},
    },
    MuiFormLabel: {
      asterisk: {
        color: '#ff2d2d',
      }
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();