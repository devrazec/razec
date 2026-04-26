"use client";

import { createContext, useState, useEffect } from "react";

import jsonSettings from "../data/settings.json";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [lang, setLang] = useState("en");
  const [activeExp, setActiveExp] = useState(0);
  const sectionSx = {
    py: { xs: 7, md: 10 },
    px: { xs: 2, md: 0 },
  };

  const [dbSettings, setDbSettings] = useState(jsonSettings);

  const [menuItem, setMenuItem] = useState([
    { text: "Home", icon: <HomeIcon />, href: "/" },
    {
      text: "About Me",
      icon: <AccountCircleOutlinedIcon />,
      href: "/pages/AboutMe",
    },
    {
      text: "Experience",
      icon: <WorkOutlinedIcon />,
      href: "/pages/Experience",
    },
    {
      text: "Academic",
      icon: <MenuBookIcon />,
      href: "/pages/Academic",
    },
    { text: "Courses", icon: <SchoolOutlinedIcon />, href: "/pages/Courses" },

    { text: "Projects", icon: <FolderOutlinedIcon />, href: "/pages/Projects" },
    {
      text: "Portfolio",
      icon: <CollectionsOutlinedIcon />,
      href: "/pages/Portfolio",
    },
    { text: "Curriculum", icon: <MenuBookIcon />, href: "/pages/Curriculum" },

    { text: "Contact", icon: <EmailOutlinedIcon />, href: "/pages/Contact" },
  ]);

  const [headerTitle, setHeaderTitle] = useState(jsonSettings.headerTitle);
  const [headerFontDarkColor, setHeaderFontDarkColor] = useState(
    jsonSettings.headerFontDarkColor,
  );
  const [headerFontLightColor, setHeaderFontLightColor] = useState(
    jsonSettings.headerFontLightColor,
  );
  const [headerFontSize, setHeaderFontSize] = useState(
    jsonSettings.headerFontSize,
  );
  const [headerBackgroundImage, setHeaderBackgroundImage] = useState(
    jsonSettings.headerBackgroundImage,
  );
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState(
    jsonSettings.headerBackgroundColor,
  );

  const [bottomFontDarkColor, setBottomFontDarkColor] = useState(
    jsonSettings.bottomFontDarkColor,
  );
  const [bottomFontLightColor, setBottomFontLightColor] = useState(
    jsonSettings.bottomFontLightColor,
  );
  const [bottomFontSize, setBottomFontSize] = useState(
    jsonSettings.bottomFontSize,
  );
  const [bottomActiveDarkColor, setBottomActiveDarkColor] = useState(
    jsonSettings.bottomActiveDarkColor,
  );
  const [bottomActiveLightColor, setBottomActiveLightColor] = useState(
    jsonSettings.bottomActiveLightColor,
  );
  const [bottomActiveFontDarkColor, setBottomActiveFontDarkColor] = useState(
    jsonSettings.bottomActiveFontDarkColor,
  );
  const [bottomActiveFontLightColor, setBottomActiveFontLightColor] = useState(
    jsonSettings.bottomActiveFontLightColor,
  );
  const [bottomBackgroundImage, setBottomBackgroundImage] = useState(
    jsonSettings.bottomBackgroundImage,
  );
  const [bottomBackgroundColor, setBottomBackgroundColor] = useState(
    jsonSettings.bottomBackgroundColor,
  );
  const [enableBottomItem, setEnableBottomItem] = useState(
    jsonSettings.enableBottomItem,
  );
  const [enableBottomBackgroundImage, setEnableBottomBackgroundImage] = useState(
    jsonSettings.enableBottomBackgroundImage,
  );
  const [enableBottomBackgroundColor, setEnableBottomBackgroundColor] = useState(
    jsonSettings.enableBottomBackgroundColor,
  );

  const [menuFontDarkColor, setMenuFontDarkColor] = useState(
    jsonSettings.menuFontDarkColor,
  );
  const [menuFontLightColor, setMenuFontLightColor] = useState(
    jsonSettings.menuFontLightColor,
  );
  const [menuFontSize, setMenuFontSize] = useState(jsonSettings.menuFontSize);
  const [menuActiveDarkColor, setMenuActiveDarkColor] = useState(
    jsonSettings.menuActiveDarkColor,
  );
  const [menuActiveLightColor, setMenuActiveLightColor] = useState(
    jsonSettings.menuActiveLightColor,
  );
  const [menuActiveFontDarkColor, setMenuActiveFontDarkColor] = useState(
    jsonSettings.menuActiveFontDarkColor,
  );
  const [menuActiveFontLightColor, setMenuActiveFontLightColor] = useState(
    jsonSettings.menuActiveFontLightColor,
  );
  const [menuBackgroundImage, setMenuBackgroundImage] = useState(
    jsonSettings.menuBackgroundImage,
  );
  const [menuBackgroundColor, setMenuBackgroundColor] = useState(
    jsonSettings.menuBackgroundColor,
  );
  const [enableMenuItem, setEnableMenuItem] = useState(
    jsonSettings.enableMenuItem,
  );
  const [enableMenuBackgroundImage, setEnableMenuBackgroundImage] = useState(
    jsonSettings.enableMenuBackgroundImage,
  );
  const [enableMenuBackgroundColor, setEnableMenuBackgroundColor] = useState(
    jsonSettings.enableMenuBackgroundColor,
  );

  const [logoImage, setLogoImage] = useState(jsonSettings.logoImage);
  const [logoSize, setLogoSize] = useState(jsonSettings.logoSize);

  const [logoBackgroundImage, setLogoBackgroundImage] = useState(
    jsonSettings.logoBackgroundImage,
  );
  const [logoBackgroundColor, setLogoBackgroundColor] = useState(
    jsonSettings.logoBackgroundColor,
  );

  const [logoTitle, setLogoTitle] = useState(jsonSettings.logoTitle);
  const [logoTitleSize, setLogoTitleSize] = useState(
    jsonSettings.logoTitleSize,
  );
  const [logoTitleDarkColor, setLogoTitleDarkColor] = useState(
    jsonSettings.logoTitleDarkColor,
  );
  const [logoTitleLightColor, setLogoTitleLightColor] = useState(
    jsonSettings.logoTitleLightColor,
  );

  const [logoSubTitle, setLogoSubTitle] = useState(jsonSettings.logoSubTitle);
  const [logoSubTitleSize, setLogoSubTitleSize] = useState(
    jsonSettings.logoSubTitleSize,
  );
  const [logoSubTitleDarkColor, setLogoSubTitleDarkColor] = useState(
    jsonSettings.logoSubTitleDarkColor,
  );
  const [logoSubTitleLightColor, setLogoSubTitleLightColor] = useState(
    jsonSettings.logoSubTitleLightColor,
  );
  const [enableLogo, setEnableLogo] = useState(jsonSettings.enableLogo);
  const [enableLogoTitle, setEnableLogoTitle] = useState(
    jsonSettings.enableLogoTitle,
  );
  const [enableLogoSubTitle, setEnableLogoSubTitle] = useState(
    jsonSettings.enableLogoSubTitle,
  );
  const [enableLogoBackgroundImage, setEnableLogoBackgroundImage] = useState(
    jsonSettings.enableLogoBackgroundImage,
  );
  const [enableLogoBackgroundColor, setEnableLogoBackgroundColor] = useState(
    jsonSettings.enableLogoBackgroundColor,
  );

  const [enableHeaderTitle, setEnableHeaderTitle] = useState(
    jsonSettings.enableHeaderTitle,
  );
  const [enableHeaderBackgroundImage, setEnableHeaderBackgroundImage] = useState(
    jsonSettings.enableHeaderBackgroundImage,
  );

  const [enableHeaderBackgroundColor, setEnableHeaderBackgroundColor] = useState(
    jsonSettings.enableHeaderBackgroundColor,
  );

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        mobileDevice,
        setMobileDevice,
        isLoading,
        setIsLoading,
        
        lang,
        setLang,
        activeExp,
        setActiveExp,
        sectionSx,

        dbSettings,
        setDbSettings,

        menuItem,
        setMenuItem,

        headerTitle,
        setHeaderTitle,
        headerFontDarkColor,
        setHeaderFontDarkColor,
        headerFontLightColor,
        setHeaderFontLightColor,
        headerFontSize,
        setHeaderFontSize,
        enableHeaderTitle,
        setEnableHeaderTitle,
        enableHeaderBackgroundImage,
        setEnableHeaderBackgroundImage,
        enableHeaderBackgroundColor,
        setEnableHeaderBackgroundColor,
        headerBackgroundImage,
        setHeaderBackgroundImage,
        headerBackgroundColor,
        setHeaderBackgroundColor,

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
        bottomBackgroundImage,
        setBottomBackgroundImage,
        bottomBackgroundColor,
        setBottomBackgroundColor,
        enableBottomItem,
        setEnableBottomItem,
        enableBottomBackgroundImage,
        setEnableBottomBackgroundImage,
        enableBottomBackgroundColor,
        setEnableBottomBackgroundColor,

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
        menuBackgroundImage,
        setMenuBackgroundImage,
        menuBackgroundColor,
        setMenuBackgroundColor,
        enableMenuItem,
        setEnableMenuItem,
        enableMenuBackgroundImage,
        setEnableMenuBackgroundImage,
        enableMenuBackgroundColor,
        setEnableMenuBackgroundColor,

        logoImage,
        setLogoImage,
        logoSize,
        setLogoSize,
        logoBackgroundImage,
        setLogoBackgroundImage,
        logoBackgroundColor,
        setLogoBackgroundColor,

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
        enableLogoBackgroundImage,
        setEnableLogoBackgroundImage,
        enableLogoBackgroundColor,
        setEnableLogoBackgroundColor,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
