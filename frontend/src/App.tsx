import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { theme } from './MUIThemes'
import { MainWindow } from './views/containers/main-window/MainWindow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <MainWindow />
      </Box>
    </ThemeProvider>
  );
}

export default App;
