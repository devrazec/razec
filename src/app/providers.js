"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useContext, useMemo, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { GlobalContext } from "./context/GlobalContext";

export default function Providers({ children }) {
  const { darkMode, setMobileDevice } = useContext(GlobalContext);

  const baseTheme = useTheme();
  const isMobileDevice = useMediaQuery(baseTheme.breakpoints.down("sm"));

  useEffect(() => {
    setMobileDevice(isMobileDevice);
  }, [isMobileDevice, setMobileDevice]);

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#24b9ef" },
          secondary: { main: "#C8A84B" },
          background: { default: "#F7F9FC", paper: "#FFFFFF" },
          text: { primary: "#1A1A2E", secondary: "#5A6A7A" },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "0 2px 20px rgba(31,78,121,0.07)",
                border: "1px solid rgba(31,78,121,0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(31,78,121,0.14)",
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" },
            },
          },
        },
      }),
    [],
  );
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: { main: "#24b9ef" },
          secondary: { main: "#C8A84B" },
          background: { default: "#F7F9FC", paper: "#FFFFFF" },
          text: { primary: "#1A1A2E", secondary: "#5A6A7A" },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "0 2px 20px rgba(31,78,121,0.07)",
                border: "1px solid rgba(31,78,121,0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(31,78,121,0.14)",
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" },
            },
          },
        },
      }),
    [],
  );

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
