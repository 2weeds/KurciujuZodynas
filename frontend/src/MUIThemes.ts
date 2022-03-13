import { createTheme, ThemeOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    bookPageTitle: true;
    aboutText: true
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  pageTitle: React.CSSProperties;
  bookPageTitle: React.CSSProperties;
  aboutText: React.CSSProperties;
}

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

      typography: {
        pageTitle: {
          fontSize: "24px",
          fontWeight: 900,
          color: 'black',
        },
        bookPageTitle: {
          fontSize: "16px",
          fontWeight: 400,
        },
        aboutText: {
          fontSize: "14px",
          color: 'black',
        },
      } as ExtendedTypographyOptions,
} as ThemeOptions);