"use client";

import { createContext, useState, useEffect } from "react";

import jsonSettings from "../data/settings.json";
import jsonSettingsList from "../data/settings_list.json";

import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dbProduct, setDbProduct] = useState([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => setDbProduct(data))
      .catch(() => {});
  }, []);
  const [dbSettings, setDbSettings] = useState(jsonSettings);
  const [dbSettingsList, setDbSettingsList] = useState(jsonSettingsList);

  const [menuItem, setMenuItem] = useState([
    { text: "Home", icon: <HomeIcon />, href: "/" },
    {
      text: "Account",
      icon: <AccountCircleOutlinedIcon />,
      href: "/pages/Account",
    },
    {
      text: "Transactions",
      icon: <ReceiptOutlinedIcon />,
      href: "/pages/Transactions",
    },
    {
      text: "Coupons",
      icon: <LocalOfferOutlinedIcon />,
      href: "/pages/Coupons",
    },
    { text: "Cart", icon: <ShoppingCartOutlinedIcon />, href: "/pages/Cart" },
    {
      text: "Settings",
      icon: <CalendarTodayOutlinedIcon />,
      href: "/pages/Settings",
    },
    { text: "Contact", icon: <EmailOutlinedIcon />, href: "/pages/Contact" },
    { text: "Terms", icon: <DescriptionOutlinedIcon />, href: "/pages/Terms" },
    {
      text: "Privacy",
      icon: <DescriptionOutlinedIcon />,
      href: "/pages/Privacy",
    },
  ]);

  const [colorList, setColorList] = useState([
    { key: "#ffffff" },
    { key: "#000000" },
    { key: "#f5f5f5" },
    { key: "#222222" },
    { key: "#d6b274" },
    { key: "#c0392b" },
    { key: "#e74c3c" },
    { key: "#e67e22" },
    { key: "#f1c40f" },
    { key: "#2ecc71" },
    { key: "#27ae60" },
    { key: "#1abc9c" },
    { key: "#3498db" },
    { key: "#2980b9" },
    { key: "#9b59b6" },
    { key: "#8e44ad" },
    { key: "#34495e" },
    { key: "#7f8c8d" },
    { key: "#bdc3c7" },
    { key: "#ecf0f1" },
  ]);
  const [logoList, setLogoList] = useState([
    { key: "1.png", source: "/logo/1.png" },
    { key: "2.png", source: "/logo/2.png" },
    { key: "3.png", source: "/logo/3.png" },
    { key: "4.png", source: "/logo/4.png" },
    { key: "5.png", source: "/logo/5.png" },
    { key: "6.png", source: "/logo/6.png" },
    { key: "7.png", source: "/logo/7.png" },
    { key: "8.png", source: "/logo/8.png" },
    { key: "9.png", source: "/logo/9.png" },
    { key: "10.png", source: "/logo/10.png" },
    { key: "11.png", source: "/logo/11.png" },
    { key: "12.png", source: "/logo/12.png" },
    { key: "13.png", source: "/logo/13.png" },
    { key: "14.png", source: "/logo/14.png" },
    { key: "15.png", source: "/logo/15.png" },
    { key: "16.png", source: "/logo/16.png" },
    { key: "17.png", source: "/logo/17.png" },
    { key: "18.png", source: "/logo/18.png" },
    { key: "19.png", source: "/logo/19.png" },
    { key: "20.png", source: "/logo/20.png" },
    { key: "21.png", source: "/logo/21.png" },
    { key: "22.png", source: "/logo/22.png" },
    { key: "23.png", source: "/logo/23.png" },
    { key: "24.png", source: "/logo/24.png" },
    { key: "25.png", source: "/logo/25.png" },
    { key: "26.png", source: "/logo/26.png" },
    { key: "27.png", source: "/logo/27.png" },
    { key: "28.png", source: "/logo/28.png" },
    { key: "29.png", source: "/logo/29.png" },
    { key: "30.png", source: "/logo/30.png" },
    { key: "31.png", source: "/logo/31.png" },
    { key: "32.png", source: "/logo/32.png" },
    { key: "33.png", source: "/logo/33.png" },
    { key: "34.png", source: "/logo/34.png" },
    { key: "35.png", source: "/logo/35.png" },
    { key: "36.png", source: "/logo/36.png" },
    { key: "37.png", source: "/logo/37.png" },
    { key: "38.png", source: "/logo/38.png" },
    { key: "39.png", source: "/logo/39.png" },
    { key: "40.png", source: "/logo/40.png" },
  ]);
  const [menuBackgroundList, setMenuBackgroundList] = useState([
    { key: "1.jpg", source: "/menu/1.jpg" },
    { key: "2.jpg", source: "/menu/2.jpg" },
    { key: "3.jpg", source: "/menu/3.jpg" },
    { key: "4.jpg", source: "/menu/4.jpg" },
    { key: "5.jpg", source: "/menu/5.jpg" },
    { key: "6.jpg", source: "/menu/6.jpg" },
    { key: "7.jpg", source: "/menu/7.jpg" },
    { key: "8.jpg", source: "/menu/8.jpg" },
    { key: "9.jpg", source: "/menu/9.jpg" },
    { key: "10.jpg", source: "/menu/10.jpg" },
    { key: "11.jpg", source: "/menu/11.jpg" },
    { key: "12.jpg", source: "/menu/12.jpg" },
    { key: "13.jpg", source: "/menu/13.jpg" },
    { key: "14.jpg", source: "/menu/14.jpg" },
    { key: "15.jpg", source: "/menu/15.jpg" },
    { key: "16.jpg", source: "/menu/16.jpg" },
    { key: "17.jpg", source: "/menu/17.jpg" },
    { key: "18.jpg", source: "/menu/18.jpg" },
    { key: "19.jpg", source: "/menu/19.jpg" },
    { key: "20.jpg", source: "/menu/20.jpg" },
    { key: "21.jpg", source: "/menu/21.jpg" },
    { key: "22.jpg", source: "/menu/22.jpg" },
    { key: "23.jpg", source: "/menu/23.jpg" },
    { key: "24.jpg", source: "/menu/24.jpg" },
    { key: "25.jpg", source: "/menu/25.jpg" },
    { key: "26.jpg", source: "/menu/26.jpg" },
    { key: "27.jpg", source: "/menu/27.jpg" },
    { key: "28.jpg", source: "/menu/28.jpg" },
    { key: "29.jpg", source: "/menu/29.jpg" },
    { key: "30.jpg", source: "/menu/30.jpg" },
    { key: "31.jpg", source: "/menu/31.jpg" },
    { key: "32.jpg", source: "/menu/32.jpg" },
    { key: "33.jpg", source: "/menu/33.jpg" },
    { key: "34.jpg", source: "/menu/34.jpg" },
    { key: "35.jpg", source: "/menu/35.jpg" },
    { key: "36.jpg", source: "/menu/36.jpg" },
    { key: "37.jpg", source: "/menu/37.jpg" },
    { key: "38.jpg", source: "/menu/38.jpg" },
    { key: "39.jpg", source: "/menu/39.jpg" },
    { key: "40.jpg", source: "/menu/40.jpg" },
    { key: "41.jpg", source: "/menu/41.jpg" },
    { key: "42.jpg", source: "/menu/42.jpg" },
    { key: "43.jpg", source: "/menu/43.jpg" },
    { key: "44.jpg", source: "/menu/44.jpg" },
    { key: "45.jpg", source: "/menu/45.jpg" },
    { key: "46.jpg", source: "/menu/46.jpg" },
    { key: "47.jpg", source: "/menu/47.jpg" },
    { key: "48.jpg", source: "/menu/48.jpg" },
    { key: "49.jpg", source: "/menu/49.jpg" },
    { key: "50.jpg", source: "/menu/50.jpg" },
    { key: "51.jpg", source: "/menu/51.jpg" },
    { key: "52.jpg", source: "/menu/52.jpg" },
    { key: "53.jpg", source: "/menu/53.jpg" },
    { key: "54.jpg", source: "/menu/54.jpg" },
    { key: "55.jpg", source: "/menu/55.jpg" },
    { key: "56.jpg", source: "/menu/56.jpg" },
    { key: "57.jpg", source: "/menu/57.jpg" },
    { key: "58.jpg", source: "/menu/58.jpg" },
    { key: "59.jpg", source: "/menu/59.jpg" },
    { key: "60.jpg", source: "/menu/60.jpg" },
    { key: "61.jpg", source: "/menu/61.jpg" },
    { key: "62.jpg", source: "/menu/62.jpg" },
    { key: "63.jpg", source: "/menu/63.jpg" },
    { key: "64.jpg", source: "/menu/64.jpg" },
    { key: "65.jpg", source: "/menu/65.jpg" },
    { key: "66.jpg", source: "/menu/66.jpg" },
    { key: "67.jpg", source: "/menu/67.jpg" },
    { key: "68.jpg", source: "/menu/68.jpg" },
    { key: "69.jpg", source: "/menu/69.jpg" },
    { key: "70.jpg", source: "/menu/70.jpg" },
    { key: "71.jpg", source: "/menu/71.jpg" },
    { key: "72.jpg", source: "/menu/72.jpg" },
    { key: "73.jpg", source: "/menu/73.jpg" },
    { key: "74.jpg", source: "/menu/74.jpg" },
    { key: "75.jpg", source: "/menu/75.jpg" },
    { key: "76.jpg", source: "/menu/76.jpg" },
    { key: "77.jpg", source: "/menu/77.jpg" },
    { key: "78.jpg", source: "/menu/78.jpg" },
    { key: "79.jpg", source: "/menu/79.jpg" },
    { key: "80.jpg", source: "/menu/80.jpg" },
    { key: "81.jpg", source: "/menu/81.jpg" },
    { key: "82.jpg", source: "/menu/82.jpg" },
    { key: "83.jpg", source: "/menu/83.jpg" },
    { key: "84.jpg", source: "/menu/84.jpg" },
    { key: "85.jpg", source: "/menu/85.jpg" },
    { key: "86.jpg", source: "/menu/86.jpg" },
    { key: "87.jpg", source: "/menu/87.jpg" },
    { key: "88.jpg", source: "/menu/88.jpg" },
    { key: "89.jpg", source: "/menu/89.jpg" },
    { key: "90.jpg", source: "/menu/90.jpg" },
    { key: "91.jpg", source: "/menu/91.jpg" },
    { key: "92.jpg", source: "/menu/92.jpg" },
    { key: "93.jpg", source: "/menu/93.jpg" },
    { key: "94.jpg", source: "/menu/94.jpg" },
    { key: "95.jpg", source: "/menu/95.jpg" },
    { key: "96.jpg", source: "/menu/96.jpg" },
    { key: "97.jpg", source: "/menu/97.jpg" },
    { key: "98.jpg", source: "/menu/98.jpg" },
    { key: "99.jpg", source: "/menu/99.jpg" },
    { key: "100.jpg", source: "/menu/100.jpg" },
    { key: "101.jpg", source: "/menu/101.jpg" },
    { key: "102.jpg", source: "/menu/102.jpg" },
    { key: "103.jpg", source: "/menu/103.jpg" },
    { key: "104.jpg", source: "/menu/104.jpg" },
    { key: "105.jpg", source: "/menu/105.jpg" },
    { key: "106.jpg", source: "/menu/106.jpg" },
    { key: "107.jpg", source: "/menu/107.jpg" },
    { key: "108.jpg", source: "/menu/108.jpg" },
    { key: "109.jpg", source: "/menu/109.jpg" },
    { key: "110.jpg", source: "/menu/110.jpg" },
    { key: "111.jpg", source: "/menu/111.jpg" },
    { key: "112.jpg", source: "/menu/112.jpg" },
    { key: "113.jpg", source: "/menu/113.jpg" },
    { key: "114.jpg", source: "/menu/114.jpg" },
    { key: "115.jpg", source: "/menu/115.jpg" },
    { key: "116.jpg", source: "/menu/116.jpg" },
    { key: "117.jpg", source: "/menu/117.jpg" },
    { key: "118.jpg", source: "/menu/118.jpg" },
    { key: "119.jpg", source: "/menu/119.jpg" },
    { key: "120.jpg", source: "/menu/120.jpg" },
    { key: "121.jpg", source: "/menu/121.jpg" },
    { key: "122.jpg", source: "/menu/122.jpg" },
    { key: "123.jpg", source: "/menu/123.jpg" },
    { key: "124.jpg", source: "/menu/124.jpg" },
    { key: "125.jpg", source: "/menu/125.jpg" },
    { key: "126.jpg", source: "/menu/126.jpg" },
    { key: "127.jpg", source: "/menu/127.jpg" },
    { key: "128.jpg", source: "/menu/128.jpg" },
    { key: "129.jpg", source: "/menu/129.jpg" },
    { key: "130.jpg", source: "/menu/130.jpg" },
    { key: "131.jpg", source: "/menu/131.jpg" },
    { key: "132.jpg", source: "/menu/132.jpg" },
    { key: "133.jpg", source: "/menu/133.jpg" },
  ]);
  const [headerBottomBackgroundList, setHeaderBottomBackgroundList] = useState([
    { key: "1.jpg", source: "/headerbottom/1.jpg" },
    { key: "2.jpg", source: "/headerbottom/2.jpg" },
    { key: "3.jpg", source: "/headerbottom/3.jpg" },
    { key: "4.jpg", source: "/headerbottom/4.jpg" },
    { key: "5.jpg", source: "/headerbottom/5.jpg" },
    { key: "6.jpg", source: "/headerbottom/6.jpg" },
    { key: "7.jpg", source: "/headerbottom/7.jpg" },
    { key: "8.jpg", source: "/headerbottom/8.jpg" },
    { key: "9.jpg", source: "/headerbottom/9.jpg" },
    { key: "10.jpg", source: "/headerbottom/10.jpg" },
    { key: "11.jpg", source: "/headerbottom/11.jpg" },
    { key: "12.jpg", source: "/headerbottom/12.jpg" },
    { key: "13.jpg", source: "/headerbottom/13.jpg" },
    { key: "14.jpg", source: "/headerbottom/14.jpg" },
    { key: "15.jpg", source: "/headerbottom/15.jpg" },
    { key: "16.jpg", source: "/headerbottom/16.jpg" },
    { key: "17.jpg", source: "/headerbottom/17.jpg" },
    { key: "18.jpg", source: "/headerbottom/18.jpg" },
    { key: "19.jpg", source: "/headerbottom/19.jpg" },
    { key: "20.jpg", source: "/headerbottom/20.jpg" },
    { key: "21.jpg", source: "/headerbottom/21.jpg" },
    { key: "22.jpg", source: "/headerbottom/22.jpg" },
    { key: "23.jpg", source: "/headerbottom/23.jpg" },
    { key: "24.jpg", source: "/headerbottom/24.jpg" },
    { key: "25.jpg", source: "/headerbottom/25.jpg" },
    { key: "26.jpg", source: "/headerbottom/26.jpg" },
    { key: "27.jpg", source: "/headerbottom/27.jpg" },
    { key: "28.jpg", source: "/headerbottom/28.jpg" },
    { key: "29.jpg", source: "/headerbottom/29.jpg" },
    { key: "30.jpg", source: "/headerbottom/30.jpg" },
    { key: "31.jpg", source: "/headerbottom/31.jpg" },
    { key: "32.jpg", source: "/headerbottom/32.jpg" },
    { key: "33.jpg", source: "/headerbottom/33.jpg" },
    { key: "34.jpg", source: "/headerbottom/34.jpg" },
    { key: "35.jpg", source: "/headerbottom/35.jpg" },
    { key: "36.jpg", source: "/headerbottom/36.jpg" },
    { key: "37.jpg", source: "/headerbottom/37.jpg" },
    { key: "38.jpg", source: "/headerbottom/38.jpg" },
    { key: "39.jpg", source: "/headerbottom/39.jpg" },
    { key: "40.jpg", source: "/headerbottom/40.jpg" },
    { key: "41.jpg", source: "/headerbottom/41.jpg" },
    { key: "42.jpg", source: "/headerbottom/42.jpg" },
    { key: "43.jpg", source: "/headerbottom/43.jpg" },
    { key: "44.jpg", source: "/headerbottom/44.jpg" },
    { key: "45.jpg", source: "/headerbottom/45.jpg" },
    { key: "46.jpg", source: "/headerbottom/46.jpg" },
    { key: "47.jpg", source: "/headerbottom/47.jpg" },
    { key: "48.jpg", source: "/headerbottom/48.jpg" },
    { key: "49.jpg", source: "/headerbottom/49.jpg" },
    { key: "50.jpg", source: "/headerbottom/50.jpg" },
    { key: "51.jpg", source: "/headerbottom/51.jpg" },
    { key: "52.jpg", source: "/headerbottom/52.jpg" },
    { key: "53.jpg", source: "/headerbottom/53.jpg" },
    { key: "54.jpg", source: "/headerbottom/54.jpg" },
    { key: "55.jpg", source: "/headerbottom/55.jpg" },
    { key: "56.jpg", source: "/headerbottom/56.jpg" },
    { key: "57.jpg", source: "/headerbottom/57.jpg" },
    { key: "58.jpg", source: "/headerbottom/58.jpg" },
    { key: "59.jpg", source: "/headerbottom/59.jpg" },
    { key: "60.jpg", source: "/headerbottom/60.jpg" },
    { key: "61.jpg", source: "/headerbottom/61.jpg" },
    { key: "62.jpg", source: "/headerbottom/62.jpg" },
    { key: "63.jpg", source: "/headerbottom/63.jpg" },
    { key: "64.jpg", source: "/headerbottom/64.jpg" },
    { key: "65.jpg", source: "/headerbottom/65.jpg" },
    { key: "66.jpg", source: "/headerbottom/66.jpg" },
    { key: "67.jpg", source: "/headerbottom/67.jpg" },
    { key: "68.jpg", source: "/headerbottom/68.jpg" },
    { key: "69.jpg", source: "/headerbottom/69.jpg" },
    { key: "70.jpg", source: "/headerbottom/70.jpg" },
    { key: "71.jpg", source: "/headerbottom/71.jpg" },
    { key: "72.jpg", source: "/headerbottom/72.jpg" },
    { key: "73.jpg", source: "/headerbottom/73.jpg" },
    { key: "74.jpg", source: "/headerbottom/74.jpg" },
    { key: "75.jpg", source: "/headerbottom/75.jpg" },
    { key: "76.jpg", source: "/headerbottom/76.jpg" },
    { key: "77.jpg", source: "/headerbottom/77.jpg" },
    { key: "78.jpg", source: "/headerbottom/78.jpg" },
    { key: "79.jpg", source: "/headerbottom/79.jpg" },
    { key: "80.jpg", source: "/headerbottom/80.jpg" },
    { key: "81.jpg", source: "/headerbottom/81.jpg" },
    { key: "82.jpg", source: "/headerbottom/82.jpg" },
    { key: "83.jpg", source: "/headerbottom/83.jpg" },
    { key: "84.jpg", source: "/headerbottom/84.jpg" },
    { key: "85.jpg", source: "/headerbottom/85.jpg" },
    { key: "86.jpg", source: "/headerbottom/86.jpg" },
    { key: "87.jpg", source: "/headerbottom/87.jpg" },
    { key: "88.jpg", source: "/headerbottom/88.jpg" },
    { key: "89.jpg", source: "/headerbottom/89.jpg" },
    { key: "90.jpg", source: "/headerbottom/90.jpg" },
    { key: "91.jpg", source: "/headerbottom/91.jpg" },
    { key: "92.jpg", source: "/headerbottom/92.jpg" },
    { key: "93.jpg", source: "/headerbottom/93.jpg" },
    { key: "94.jpg", source: "/headerbottom/94.jpg" },
    { key: "95.jpg", source: "/headerbottom/95.jpg" },
    { key: "96.jpg", source: "/headerbottom/96.jpg" },
    { key: "97.jpg", source: "/headerbottom/97.jpg" },
    { key: "98.jpg", source: "/headerbottom/98.jpg" },
    { key: "99.jpg", source: "/headerbottom/99.jpg" },
    { key: "100.jpg", source: "/headerbottom/100.jpg" },
    { key: "101.jpg", source: "/headerbottom/101.jpg" },
    { key: "102.jpg", source: "/headerbottom/102.jpg" },
    { key: "103.jpg", source: "/headerbottom/103.jpg" },
    { key: "104.jpg", source: "/headerbottom/104.jpg" },
    { key: "105.jpg", source: "/headerbottom/105.jpg" },
    { key: "106.jpg", source: "/headerbottom/106.jpg" },
    { key: "107.jpg", source: "/headerbottom/107.jpg" },
    { key: "108.jpg", source: "/headerbottom/108.jpg" },
    { key: "109.jpg", source: "/headerbottom/109.jpg" },
    { key: "110.jpg", source: "/headerbottom/110.jpg" },
    { key: "111.jpg", source: "/headerbottom/111.jpg" },
    { key: "112.jpg", source: "/headerbottom/112.jpg" },
    { key: "113.jpg", source: "/headerbottom/113.jpg" },
    { key: "114.jpg", source: "/headerbottom/114.jpg" },
    { key: "115.jpg", source: "/headerbottom/115.jpg" },
    { key: "116.jpg", source: "/headerbottom/116.jpg" },
    { key: "117.jpg", source: "/headerbottom/117.jpg" },
    { key: "118.jpg", source: "/headerbottom/118.jpg" },
    { key: "119.jpg", source: "/headerbottom/119.jpg" },
    { key: "120.jpg", source: "/headerbottom/120.jpg" },
    { key: "121.jpg", source: "/headerbottom/121.jpg" },
    { key: "122.jpg", source: "/headerbottom/122.jpg" },
    { key: "123.jpg", source: "/headerbottom/123.jpg" },
    { key: "124.jpg", source: "/headerbottom/124.jpg" },
    { key: "125.jpg", source: "/headerbottom/125.jpg" },
    { key: "126.jpg", source: "/headerbottom/126.jpg" },
    { key: "127.jpg", source: "/headerbottom/127.jpg" },
    { key: "128.jpg", source: "/headerbottom/128.jpg" },
    { key: "129.jpg", source: "/headerbottom/129.jpg" },
    { key: "130.jpg", source: "/headerbottom/130.jpg" },
    { key: "131.jpg", source: "/headerbottom/131.jpg" },
    { key: "132.jpg", source: "/headerbottom/132.jpg" },
    { key: "133.jpg", source: "/headerbottom/133.jpg" },
    { key: "134.jpg", source: "/headerbottom/134.jpg" },
    { key: "135.jpg", source: "/headerbottom/135.jpg" },
    { key: "136.jpg", source: "/headerbottom/136.jpg" },
    { key: "137.jpg", source: "/headerbottom/137.jpg" },
    { key: "138.jpg", source: "/headerbottom/138.jpg" },
    { key: "139.jpg", source: "/headerbottom/139.jpg" },
    { key: "140.jpg", source: "/headerbottom/140.jpg" },
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
  const [headerBackgroundSelected, setHeaderBackgroundSelected] = useState(
    jsonSettings.headerBackgroundSelected,
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
  const [bottomBackgroundSelected, setBottomBackgroundSelected] = useState(
    jsonSettings.bottomBackgroundSelected,
  );
  const [enableBottomItem, setEnableBottomItem] = useState(
    jsonSettings.enableBottomItem,
  );
  const [enableBottomBackground, setEnableBottomBackground] = useState(
    jsonSettings.enableBottomBackground,
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
  const [menuBackgroundSelected, setMenuBackgroundSelected] = useState(
    jsonSettings.menuBackgroundSelected,
  );
  const [enableMenuItem, setEnableMenuItem] = useState(
    jsonSettings.enableMenuItem,
  );
  const [enableMenuBackground, setEnableMenuBackground] = useState(
    jsonSettings.enableMenuBackground,
  );

  const [logoSelected, setLogoSelected] = useState(jsonSettings.logoSelected);
  const [logoSize, setLogoSize] = useState(jsonSettings.logoSize);
  const [logoBackgroundSelected, setLogoBackgroundSelected] = useState(
    jsonSettings.logoBackgroundSelected,
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
  const [enableLogoBackground, setEnableLogoBackground] = useState(
    jsonSettings.enableLogoBackground,
  );

  const [enableHeaderTitle, setEnableHeaderTitle] = useState(
    jsonSettings.enableHeaderTitle,
  );
  const [enableHeaderBackground, setEnableHeaderBackground] = useState(
    jsonSettings.enableHeaderBackground,
  );

  useEffect(() => {
    const fetchTable = async (url, setter) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url} → ${res.status}`);
        setter(await res.json());
      } catch (err) {
        console.error("[GlobalContext] fetch error:", err.message);
      }
    };

    fetchTable("/api/product", setDbProduct);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        mobileDevice,
        setMobileDevice,
        isLoading,
        setIsLoading,

        dbProduct,
        setDbProduct,

        dbSettings,
        setDbSettings,
        dbSettingsList,
        setDbSettingsList,

        menuItem,
        setMenuItem,

        colorList,
        setColorList,
        logoList,
        setLogoList,
        menuBackgroundList,
        setMenuBackgroundList,
        headerBottomBackgroundList,
        setHeaderBottomBackgroundList,

        headerTitle,
        setHeaderTitle,
        headerFontDarkColor,
        setHeaderFontDarkColor,
        headerFontLightColor,
        setHeaderFontLightColor,
        headerFontSize,
        setHeaderFontSize,
        headerBackgroundSelected,
        setHeaderBackgroundSelected,
        enableHeaderTitle,
        setEnableHeaderTitle,
        enableHeaderBackground,
        setEnableHeaderBackground,

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
        enableBottomItem,
        setEnableBottomItem,
        enableBottomBackground,
        setEnableBottomBackground,

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
        menuBackgroundSelected,
        setMenuBackgroundSelected,
        enableMenuItem,
        setEnableMenuItem,
        enableMenuBackground,
        setEnableMenuBackground,

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
