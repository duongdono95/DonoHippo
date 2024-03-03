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
      main: `rgba(var(--error-code))`,
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
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    // // ------------------------------------General buttons
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
        contained: {
          color: 'var(--white)',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    // ------------------------------------Form Select
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 12,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    // // ------------------------------------Form Select Dropdown Option
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    // // ------------------------------------Form Input
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 12,
        },
      },
    },

    //  -------------------------------------------- ToolTip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          cursor: 'pointer',
        },
      },
    },
    // ---------------------------------------Toggle Buttons
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontWeight: 600,
          padding: 0,
        },
      },
    },
  },
});
