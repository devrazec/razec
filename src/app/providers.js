'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useContext, useMemo, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { GlobalContext } from './context/GlobalContext';

export default function Providers({ children }) {
  const {
    darkMode,
    setMobileDevice,
  } = useContext(GlobalContext);

  const baseTheme = useTheme();
  const isMobileDevice = useMediaQuery(baseTheme.breakpoints.down('sm'));

  useEffect(() => {
    setMobileDevice(isMobileDevice);
  }, [isMobileDevice, setMobileDevice]);

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#24b9ef' },
        },
      }),
    []
  );
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#24b9ef' },
        },
      }),
    []
  );

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}
    </ThemeProvider>
  );
}
