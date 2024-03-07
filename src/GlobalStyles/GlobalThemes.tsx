'use client';

import { createTheme } from '@mui/material';
export const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: `rgb(var(--primary-code))`,
    },
    secondary: {
      main: `rgb(var(--secondary-code))`,
    },
    error: {
      main: `rgba(255, 0, 0, 1)`,
    },
    success: {
      main: `rgba(var(--success-code))`,
    },
    warning: {
      main: `rgba(var(--warning-code))`,
    },
    info: {
      main: `rgba(var(--info-code))`,
    },
  },
  components: {
    //  ------------------------------------FORM LABEL
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white',
        },
        root: {
          color: 'var(--black07)',
        },
      },
    },
  },
});
