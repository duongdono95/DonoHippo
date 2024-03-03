'use client';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export const GlobalTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: `rgb(var(--primary-code))`,
        },
        secondary: {
          main: `rgb(var(--secondary-code))`,
        },
      },
    },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: `${callVar('--white')}`,
    //     },
    //     background: {
    //       default: `${callVar('--primary-dark')}`,
    //     },
    //     text: {
    //       primary: `${callVar('--white')}`,
    //     },
    //   },
    // },
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
