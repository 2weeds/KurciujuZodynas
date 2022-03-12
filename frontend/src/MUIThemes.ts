import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
          main: '#fff',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#ADADAD',
          paper: '#EBEBEB',
        },
      },
      components: {
          MuiButton: {
              styleOverrides: {
                  text: {
                      color: 'black',
                  }
              },
          },
      },
});