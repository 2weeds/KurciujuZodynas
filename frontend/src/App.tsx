import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { theme } from './MUIThemes'
import { PageHeader } from "./views/components/PageHeader"
import { PageTitle } from "./views/components/PageTitle"
import { MainWindow } from './views/containers/main-window/MainWindow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <PageHeader />
        <PageTitle />
        <MainWindow />
      </Box>
    </ThemeProvider>
  );
}

export default App;
