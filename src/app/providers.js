'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useContext, useMemo, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { GlobalContext } from './context/GlobalContext';

export default function Providers({ children }) {
  const { darkMode, setMobileDevice } = useContext(GlobalContext);

  const isMobileDevice = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setMobileDevice(isMobileDevice);
  }, [isMobileDevice, setMobileDevice]);

  const lightTheme = useMemo(() => createTheme({
    palette: { mode: 'light' }
  }), []);

  const darkTheme = useMemo(() => createTheme({
    palette: { mode: 'dark' }
  }), []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
