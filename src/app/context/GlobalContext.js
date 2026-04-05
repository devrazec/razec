'use client';

import { createContext, useState, useMemo } from 'react';

export const GlobalContext = createContext(undefined);

export function GlobalProvider({ children, translations }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);

  const value = useMemo(() => ({
    darkMode,
    setDarkMode,
    mobileDevice,
    setMobileDevice,
    t: translations,
  }), [darkMode, mobileDevice, translations]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
