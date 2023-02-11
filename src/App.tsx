import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from "./store";
import Main from './components/main';

const AppContainer = styled('div')({
  height: "100vh",
  width: "100vw"
});

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App() {
  const [theme, setTheme ] = useState<'light' | 'dark'>('dark')

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <AppContainer>
          <Main />
        </AppContainer>
      </ThemeProvider>
    </Provider>
    
  );
}

export default App;
