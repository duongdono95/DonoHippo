import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';

import { GlobalTheme } from './GlobalThemes';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <CssVarsProvider theme={GlobalTheme}>
      <CssBaseline />
      {children}
      <ToastContainer position="top-center" />
    </CssVarsProvider>
  );
};

export default Provider;
