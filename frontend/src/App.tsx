import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { theme } from './MUIThemes'
import { PageHeader } from "./views/components/PageHeader"
import { PageTitle } from "./views/components/PageTitle"
import { LandingWindow } from './views/containers/landing-window/LandingWindow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <PageHeader />
        <PageTitle />
        <LandingWindow />
      </Box>
    </ThemeProvider>
  );
}

export default App;
