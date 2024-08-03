import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(241, 156, 144, 1)', 
    },
    secondary: {
      main: '#4A90E2', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '8px 0',
        },
      },
    },
  },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Review" element={<Review />} />
                    <Route path="/MyPage" element={<MyPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
