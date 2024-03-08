import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';
import { GlobalTheme } from './GlobalThemes';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from '@/components/Provider';
const AppGeneralConfig = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <ThemeProvider theme={GlobalTheme}>
        {children}
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </Provider>
  );
};

export default AppGeneralConfig;
