'use client';

import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import { GlobalContext } from './context/GlobalContext';

export default function Home() {

  const { darkMode, setDarkMode, t } = useContext(GlobalContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header title={t.headerTitle} />
          <MainGrid />
        </Stack>
      </Box>
    </Box>
  );
}
