"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "../context/GlobalContext";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";

const DRAWER_WIDTH = 240;

export default function Header() {
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

    headerTitle,
    setHeaderTitle,
    headerFontDarkColor,
    setHeaderFontDarkColor,
    headerFontLightColor,
    setHeaderFontLightColor,
    headerFontSize,
    setHeaderFontSize,
    headerBackgroundImage,
    setHeaderBackgroundImage,
    headerBackgroundColor,
    setHeaderBackgroundColor,
    enableHeaderTitle,
    setEnableHeaderTitle,
    enableHeaderBackgroundImage,
    setEnableHeaderBackgroundImage,
    enableHeaderBackgroundColor,
    setEnableHeaderBackgroundColor,

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

    enableMenuBackgroundImage,
    setEnableMenuBackgroundImage,
    enableBottomBackgroundImage,
    setEnableBottomBackgroundImage,
  } = useContext(GlobalContext);

  const pathname = usePathname();
  const router = useRouter();
  const anchorRef = useRef(null);

  const isHome = pathname === "/";
  const showBackArrow = !isHome && mobileDevice;

  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{
        //backgroundColor: enableHeaderBackground ? "transparent" : "rgba(0,0,0,0.15)",
        //backdropFilter: enableHeaderBackground ? "none" : "blur(12px)",
        //WebkitBackdropFilter: enableHeaderBackground ? "none" : "blur(12px)",
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        left: { xs: 0, md: DRAWER_WIDTH },
        right: 0,
        width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
      }}
    >
      <Toolbar
        sx={{
          padding: 0,
          height: 70,
          display: "flex",
          backgroundImage: enableHeaderBackgroundImage
            ? `url(${headerBackgroundImage})`
            : "none",
          backgroundColor: enableHeaderBackgroundColor ? headerBackgroundColor : "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Mobile Logo */}
        {enableLogo && (
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              height: 70,
              backgroundImage: enableLogoBackgroundImage
                ? `url(${logoBackgroundImage})`
                : "none",
              backgroundColor: enableLogoBackgroundColor ? logoBackgroundColor : "transparent",
              backgroundSize: "cover",
              backgroundPosition: "center",
              paddingY: 0,
              paddingRight: 1,
              paddingLeft: 1,
              //borderRadius: 1,
            }}
          >
            <Image
              src={logoImage}
              alt="Logo"
              //width={165}
              //height={65}
              width={logoSize.width}
              height={logoSize.height}
              style={{ objectFit: "contain" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
              {enableLogoTitle && (
                <Typography
                  sx={{
                    fontSize: logoTitleSize,
                    fontWeight: "bold",
                    //color: darkMode ? logoTitleLightColor : logoTitleDarkColor,
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
                    color: darkMode
                      ? logoSubTitleLightColor
                      : logoSubTitleDarkColor,
                    lineHeight: 1.2,
                  }}
                >
                  {logoSubTitle}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Block 2: Header Content - Flexible width */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 70,
            paddingX: 2,
            marginLeft: { xs: 0, md: 0 },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {enableHeaderTitle && (
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontSize: headerFontSize,
                  color: darkMode ? headerFontLightColor : headerFontDarkColor,
                }}
              >
                {headerTitle ||
                  (pathname === "/" ? "Home" : pathname.replace("/pages/", ""))}
              </Typography>
            )}
          </Box>

          {/* <IconButton
            sx={{ color: darkMode ? headerFontLightColor : headerFontDarkColor }}
            onClick={() => router.push("/pages/Cart")}
          >
            <Badge badgeContent={dbProduct?.cartCount ?? 0} color="error" max={99}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton> */}

          <IconButton
            sx={{
              color: darkMode ? headerFontLightColor : headerFontDarkColor,
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
