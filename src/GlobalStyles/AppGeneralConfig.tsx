import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';
import { GlobalTheme } from './GlobalThemes';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppGeneralConfig = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      {children}
      <ToastContainer position="top-center" />
    </ThemeProvider>
  );
};

export default AppGeneralConfig;
