import { ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { theme } from './MUIThemes'
import { MainWindow } from './views/containers/main-window/MainWindow';
import { SnackbarProvider } from "notistack"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <MainWindow />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
