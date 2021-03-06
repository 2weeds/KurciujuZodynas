import { createTheme, ThemeOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import React from 'react';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    bookPageTitle: true;
    aboutText: true;
    error: true;
    tableHeadTitle: true;
    tableBodyTitle: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  pageTitle: React.CSSProperties;
  bookPageTitle: React.CSSProperties;
  aboutText: React.CSSProperties;
  error: React.CSSProperties;
  tableHeadTitle: React.CSSProperties;
  tableBodyTitle: React.CSSProperties;
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
        error: {
          fontSize: "14px",
          color: "#FF0004",
        },
        tableHeadTitle: {
          fontSize: '20px',
          fontWeight: 800,
        },

        tableBodyTitle: {
          fontSize: '18px',
          fontWeight: 500
        }
      } as ExtendedTypographyOptions,
} as ThemeOptions);