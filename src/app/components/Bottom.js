"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { useRouter, usePathname } from "next/navigation";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Bottom() {
  const {
    dbProduct,
    darkMode,
    setDarkMode,
    mobileDevice,
    selectedDate,
    setSelectedDate,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedRange,
    setSelectedRange,
    menuItem,
    setMenuItem,

    bottomFontDarkColor,
    setBottomFontDarkColor,
    bottomFontLightColor,
    setBottomFontLightColor,
    bottomFontSize,
    setBottomFontSize,
    bottomActiveDarkColor,
    setBottomActiveDarkColor,
    bottomActiveLightColor,
    setBottomActiveLightColor,
    bottomActiveFontDarkColor,
    setBottomActiveFontDarkColor,
    bottomActiveFontLightColor,
    setBottomActiveFontLightColor,
    bottomBackgroundSelected,
    setBottomBackgroundSelected,

    enableLogoBackground,
    setEnableLogoBackground,
    enableMenuBackground,
    setEnableMenuBackground,
    enableBottomBackground,
    setEnableBottomBackground,
    enableBottomItem, setEnableBottomItem,
    enableHeaderBackground,
    setEnableHeaderBackground,
  } = useContext(GlobalContext);

  const pathname = usePathname();
  const router = useRouter();
  const scrollRef = useRef(null);
  const foundIndex = menuItem.findIndex(({ href }) => href === pathname);
  const activeIndex = foundIndex !== -1 ? foundIndex : 0;

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 150, behavior: "smooth" });
  };

  useEffect(() => {
    if (scrollRef.current && activeIndex >= 0) {
      const scrollPosition =
        activeIndex * 80 - scrollRef.current.offsetWidth / 2 + 40;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <Paper
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundImage: enableBottomBackground ? `url(${bottomBackgroundSelected})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 0,
      }}
      elevation={3}
    >
      {enableBottomItem && (
        <IconButton
          size="small"
          onClick={() => scroll(-1)}
          sx={{ flexShrink: 0 }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <BottomNavigation
          showLabels
          value={activeIndex}
          onChange={(_, newValue) => router.push(menuItem[newValue].href)}
          sx={{
            width: `${menuItem.length * 80}px`,
            "&::-webkit-scrollbar": { display: "none" },
            backgroundColor: "transparent",
          }}
        >
          {enableBottomItem && menuItem.map(({ text, icon }) => (
            <BottomNavigationAction
              key={text}
              label={text}
              icon={icon}
              sx={{
                minWidth: 72,
                flexShrink: 0,
                color: darkMode ? bottomFontDarkColor : bottomFontLightColor,
                "& .MuiBottomNavigationAction-label": {
                  fontSize: bottomFontSize,
                },
                "& .MuiSvgIcon-root": {
                  color: darkMode ? bottomFontDarkColor : bottomFontLightColor,
                },
                "&.Mui-selected": {
                  backgroundColor: darkMode
                    ? bottomActiveDarkColor
                    : bottomActiveLightColor,
                  color: darkMode
                    ? bottomActiveFontDarkColor
                    : bottomActiveFontLightColor,
                  "& .MuiBottomNavigationAction-label": {
                    fontSize: bottomFontSize,
                  },
                  "& .MuiSvgIcon-root": {
                    color: darkMode
                      ? bottomActiveFontDarkColor
                      : bottomActiveFontLightColor,
                  },
                },
              }}
            />
          ))}
        </BottomNavigation>
      </div>

      {enableBottomItem && (
        <IconButton size="small" onClick={() => scroll(1)} sx={{ flexShrink: 0 }}>
          <ChevronRightIcon />
        </IconButton>
      )}
    </Paper>
  );
}
