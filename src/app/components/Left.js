"use client";

import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const DRAWER_WIDTH = 240;

export default function Left() {
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

    menuFontDarkColor,
    setMenuFontDarkColor,
    menuFontLightColor,
    setMenuFontLightColor,
    menuFontSize,
    setMenuFontSize,
    menuActiveDarkColor,
    setMenuActiveDarkColor,
    menuActiveLightColor,
    setMenuActiveLightColor,
    menuActiveFontDarkColor,
    setMenuActiveFontDarkColor,
    menuActiveFontLightColor,
    setMenuActiveFontLightColor,
    enableMenuItem, setEnableMenuItem,
    menuBackgroundSelected,
    setMenuBackgroundSelected,

    logoSelected,
    setLogoSelected,
    logoSize,
    setLogoSize,
    logoBackgroundSelected,
    setLogoBackgroundSelected,

    logoTitle,
    setLogoTitle,
    logoTitleSize,
    setLogoTitleSize,
    logoTitleDarkColor,
    setLogoTitleDarkColor,
    logoTitleLightColor,
    setLogoTitleLightColor,

    logoSubTitle,
    setLogoSubTitle,
    logoSubTitleSize,
    setLogoSubTitleSize,
    logoSubTitleDarkColor,
    setLogoSubTitleDarkColor,
    logoSubTitleLightColor,
    setLogoSubTitleLightColor,

    enableLogo,
    setEnableLogo,
    enableLogoTitle,
    setEnableLogoTitle,
    enableLogoSubTitle,
    setEnableLogoSubTitle,
    enableLogoBackground,
    setEnableLogoBackground,

    enableMenuBackground,
    setEnableMenuBackground,
    enableBottomBackground,
    setEnableBottomBackground,
    enableHeaderBackground,
    setEnableHeaderBackground,
  } = useContext(GlobalContext);

  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          zIndex: (theme) => theme.zIndex.drawer,
          overflowX: "hidden",
          backgroundImage: enableMenuBackground
            ? `url(${menuBackgroundSelected})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: DRAWER_WIDTH,
          height: 70,
          backgroundImage: enableLogoBackground
            ? `url(${logoBackgroundSelected})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingY: 0,
          paddingRight: 2,
          paddingLeft: 1,
        }}
      >
        {enableLogo && (
          <Image
            src={logoSelected}
            alt="Logo"
            width={logoSize.width}
            height={logoSize.height}
            style={{ objectFit: "contain" }}
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          {enableLogoTitle && (
            <Typography
              sx={{
                fontSize: logoTitleSize,
                fontWeight: "bold",
                color: darkMode ? logoTitleLightColor : logoTitleDarkColor,
                lineHeight: 1.2,
              }}
            >
              {logoTitle}
            </Typography>
          )}
          {enableLogoSubTitle && (
            <Typography
              sx={{
                fontSize: logoSubTitleSize,
                color: darkMode ? logoSubTitleLightColor : logoSubTitleDarkColor,
                lineHeight: 1.2,
              }}
            >
              {logoSubTitle}
            </Typography>
          )}
        </Box>
      </Box>

      {enableMenuItem && (
        <List>
          {menuItem.map(({ text, icon, href }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                selected={pathname === href}
                sx={{
                  color: darkMode ? menuFontDarkColor : menuFontLightColor,
                  "& .MuiListItemIcon-root": {
                    color: darkMode ? menuFontDarkColor : menuFontLightColor,
                  },
                  "& .MuiListItemText-primary": {
                    fontSize: menuFontSize,
                  },
                  "&.Mui-selected": {
                    backgroundColor: darkMode
                      ? menuActiveDarkColor
                      : menuActiveLightColor,
                    color: darkMode
                      ? menuActiveFontDarkColor
                      : menuActiveFontLightColor,
                    "& .MuiListItemIcon-root": {
                      color: darkMode
                        ? menuActiveFontDarkColor
                        : menuActiveFontLightColor,
                    },
                    "&:hover": {
                      backgroundColor: darkMode
                        ? menuActiveDarkColor
                        : menuActiveLightColor,
                      opacity: 0.9,
                    },
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}
