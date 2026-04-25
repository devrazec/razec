"use client";

import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Layout from "../../components/Layout";
import { useLoading } from "../../hooks/useLoading";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// ── Reusable sub-components ──────────────────────────────────────────────────

function SettingsCard({ children, darkMode }) {
  return (
    <div
      style={{
        background: darkMode ? "#1f2937" : "#ffffff",
        borderRadius: 12,
        padding: "18px 18px 14px",
        marginBottom: 14,
        boxShadow: darkMode
          ? "0 1px 6px rgba(0,0,0,0.45)"
          : "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, darkMode }) {
  return (
    <Typography
      variant="subtitle1"
      style={{
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 0.4,
        color: darkMode ? "#e5e7eb" : "#1f2937",
        marginBottom: 14,
      }}
    >
      {children}
    </Typography>
  );
}

function RowLabel({ children, darkMode }) {
  return (
    <Typography
      variant="caption"
      style={{
        display: "block",
        color: darkMode ? "#9ca3af" : "#6b7280",
        marginBottom: 4,
        fontWeight: 500,
      }}
    >
      {children}
    </Typography>
  );
}

function ColorSelector({ label, value, onChange, colorList, darkMode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Typography
        variant="caption"
        style={{
          display: "block",
          color: darkMode ? "#9ca3af" : "#6b7280",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}&nbsp;
        <span
          style={{
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 4,
            background: value,
            color:
              value === "#ffffff" ||
              value === "#f5f5f5" ||
              value === "#ecf0f1" ||
              value === "#bdc3c7"
                ? "#333"
                : "#fff",
            fontSize: 11,
          }}
        >
          {value}
        </span>
      </Typography>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {colorList.map((c) => (
          <div
            key={c.key}
            title={c.key}
            onClick={() => onChange(c.key)}
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: c.key,
              border:
                value === c.key
                  ? "3px solid #3498db"
                  : darkMode
                    ? "2px solid #374151"
                    : "2px solid #e5e7eb",
              cursor: "pointer",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ImageStrip({ images, selected, onSelect, thumbSize = 80 }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 6,
        paddingTop: 2,
      }}
    >
      {images.map((img) => (
        <div
          key={img.key}
          onClick={() => onSelect(img.source)}
          style={{
            flexShrink: 0,
            width: thumbSize,
            height: thumbSize,
            borderRadius: 8,
            overflow: "hidden",
            border:
              selected === img.source
                ? "3px solid #3498db"
                : "2px solid transparent",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Image
            src={img.source}
            alt={img.key}
            fill
            sizes={`${thumbSize}px`}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const {
    darkMode,
    colorList,
    logoList,
    menuBackgroundList,
    headerBottomBackgroundList,
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
    enableBottomBackground,
    setEnableBottomBackground,
    enableBottomItem,
    setEnableBottomItem,
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
    enableMenuItem, setEnableMenuItem,
    enableMenuBackground,
    setEnableMenuBackground,
    dbSettings, setDbSettings,
    dbSettingsList, setDbSettingsList,
  } = useContext(GlobalContext);

  const { showLoading, hideLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(timer);
  }, []);

  const textColor = darkMode ? "#f3f4f6" : "#111827";
  const labelColor = darkMode ? "#9ca3af" : "#6b7280";

  function applyTheme(theme) {
    setDbSettings(theme);
    setLogoSelected(theme.logoSelected);
    setLogoSize(theme.logoSize);
    setLogoBackgroundSelected(theme.logoBackgroundSelected);
    setEnableLogo(theme.enableLogo);
    setEnableLogoBackground(theme.enableLogoBackground);
    setLogoTitle(theme.logoTitle);
    setLogoTitleSize(theme.logoTitleSize);
    setLogoTitleDarkColor(theme.logoTitleDarkColor);
    setLogoTitleLightColor(theme.logoTitleLightColor);
    setEnableLogoTitle(theme.enableLogoTitle);
    setLogoSubTitle(theme.logoSubTitle);
    setLogoSubTitleSize(theme.logoSubTitleSize);
    setLogoSubTitleDarkColor(theme.logoSubTitleDarkColor);
    setLogoSubTitleLightColor(theme.logoSubTitleLightColor);
    setEnableLogoSubTitle(theme.enableLogoSubTitle);
    setHeaderFontSize(theme.headerFontSize);
    setHeaderFontDarkColor(theme.headerFontDarkColor);
    setHeaderFontLightColor(theme.headerFontLightColor);
    setHeaderBackgroundSelected(theme.headerBackgroundSelected);
    setEnableHeaderTitle(theme.enableHeaderTitle);
    setEnableHeaderBackground(theme.enableHeaderBackground);
    setBottomFontSize(theme.bottomFontSize);
    setBottomFontDarkColor(theme.bottomFontDarkColor);
    setBottomFontLightColor(theme.bottomFontLightColor);
    setBottomActiveDarkColor(theme.bottomActiveDarkColor);
    setBottomActiveLightColor(theme.bottomActiveLightColor);
    setBottomActiveFontDarkColor(theme.bottomActiveFontDarkColor);
    setBottomActiveFontLightColor(theme.bottomActiveFontLightColor);
    setBottomBackgroundSelected(theme.bottomBackgroundSelected);
    setEnableBottomItem(theme.enableBottomItem);
    setEnableBottomBackground(theme.enableBottomBackground);
    setMenuFontSize(theme.menuFontSize);
    setMenuFontDarkColor(theme.menuFontDarkColor);
    setMenuFontLightColor(theme.menuFontLightColor);
    setMenuActiveDarkColor(theme.menuActiveDarkColor);
    setMenuActiveLightColor(theme.menuActiveLightColor);
    setMenuActiveFontDarkColor(theme.menuActiveFontDarkColor);
    setMenuActiveFontLightColor(theme.menuActiveFontLightColor);
    setMenuBackgroundSelected(theme.menuBackgroundSelected);
    setEnableMenuItem(theme.enableMenuItem);
    setEnableMenuBackground(theme.enableMenuBackground);
  }

  return (
    <Layout>
      <div
        style={{
          padding: "20px 16px 64px",
          overflowY: "auto",
          height: "100%",
          background: darkMode ? "#111827" : "#f3f4f6",
        }}
      >
        {/* ══ THEME SELECTOR ════════════════════════════════════════════ */}
        <Typography
          variant="h6"
          style={{ fontWeight: 700, color: textColor, marginBottom: 18 }}
        >
          Theme
        </Typography>
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Theme Preview</SectionTitle>
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 6,
              paddingTop: 2,
            }}
          >
            {dbSettingsList.map((theme) => {
              const isSelected = dbSettings.key === theme.key;
              return (
                <div
                  key={theme.key}
                  onClick={() => applyTheme(theme)}
                  style={{
                    flexShrink: 0,
                    width: 110,
                    cursor: "pointer",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: isSelected ? "3px solid #3498db" : "3px solid transparent",
                    boxSizing: "border-box",
                    boxShadow: isSelected ? "0 0 0 1px #3498db" : "none",
                  }}
                >
                  <div style={{ position: "relative", height: 72 }}>
                    <Image
                      src={theme.source}
                      alt={theme.key}
                      fill
                      sizes="110px"
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "5px 7px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: isSelected
                        ? "#3498db"
                        : darkMode
                          ? "#e5e7eb"
                          : "#1f2937",
                      background: darkMode ? "#1f2937" : "#ffffff",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {/* {theme.key} */}
                  </div>
                </div>
              );
            })}
          </div>
        </SettingsCard>

        <Typography
          variant="h6"
          style={{ fontWeight: 700, color: textColor, marginBottom: 18 }}
        >
          Logo Settings
        </Typography>

        {/* ── Preview ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Logo Preview</SectionTitle>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              height: 110,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: 14,
              backgroundImage:
                enableLogoBackground && logoBackgroundSelected
                  ? `url(${logoBackgroundSelected})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: enableLogoBackground
                ? undefined
                : darkMode
                  ? "#374151"
                  : "#f9fafb",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            {enableLogo && logoSelected && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSelected}
                alt="logo preview"
                style={{
                  width: logoSize.width,
                  height: logoSize.height,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div>
              {enableLogoTitle && (
                <div
                  style={{
                    fontSize: logoTitleSize,
                    fontWeight: 700,
                    color: darkMode ? logoTitleLightColor : logoTitleDarkColor,
                    lineHeight: 1.2,
                  }}
                >
                  {logoTitle}
                </div>
              )}
              {enableLogoSubTitle && (
                <div
                  style={{
                    fontSize: logoSubTitleSize,
                    color: darkMode
                      ? logoSubTitleLightColor
                      : logoSubTitleDarkColor,
                    marginTop: 4,
                  }}
                >
                  {logoSubTitle}
                </div>
              )}
            </div>
          </div>
        </SettingsCard>

        {/* ── Logo Image + Size ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Logo Image
            </Typography>
            <Switch
              checked={!!enableLogo}
              onChange={(e) => setEnableLogo(e.target.checked)}
              size="small"
            />
          </div>
          <ImageStrip
            images={logoList}
            selected={logoSelected}
            onSelect={setLogoSelected}
            thumbSize={72}
          />
          <RowLabel darkMode={darkMode} style={{ marginTop: 14 }}>Logo Size: {logoSize.width}px</RowLabel>
          <Slider
            min={24}
            max={82}
            step={2}
            value={logoSize.width}
            onChange={(_, val) => setLogoSize({ width: val, height: val })}
            sx={{ color: "#3498db" }}
          />
        </SettingsCard>

        {/* ── Logo Background ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: enableLogoBackground ? 12 : 0,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Logo Background
            </Typography>
            <Switch
              checked={!!enableLogoBackground}
              onChange={(e) => setEnableLogoBackground(e.target.checked)}
              size="small"
            />
          </div>
          {enableLogoBackground && (
            <ImageStrip
              images={menuBackgroundList}
              selected={logoBackgroundSelected}
              onSelect={setLogoBackgroundSelected}
              thumbSize={80}
            />
          )}
        </SettingsCard>

        {/* ── Logo Title ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Logo Title
            </Typography>
            <Switch
              checked={!!enableLogoTitle}
              onChange={(e) => setEnableLogoTitle(e.target.checked)}
              size="small"
            />
          </div>
          <TextField
            label="Title Text"
            value={logoTitle}
            onChange={(e) => setLogoTitle(e.target.value)}
            size="small"
            fullWidth
            style={{ marginBottom: 16 }}
            sx={{
              "& .MuiInputBase-input": { color: textColor },
              "& .MuiInputLabel-root": { color: labelColor },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "#374151" : "#d1d5db",
              },
            }}
          />
          <RowLabel darkMode={darkMode}>Font Size: {logoTitleSize}px</RowLabel>
          <Slider
            min={10}
            max={41}
            step={1}
            value={logoTitleSize}
            onChange={(_, val) => setLogoTitleSize(val)}
            sx={{ color: "#3498db", mb: 1 }}
          />
          <ColorSelector
            label="Dark Mode Color"
            value={logoTitleDarkColor}
            onChange={setLogoTitleDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Color"
            value={logoTitleLightColor}
            onChange={setLogoTitleLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ── Logo Subtitle ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Logo Subtitle
            </Typography>
            <Switch
              checked={!!enableLogoSubTitle}
              onChange={(e) => setEnableLogoSubTitle(e.target.checked)}
              size="small"
            />
          </div>
          <TextField
            label="Subtitle Text"
            value={logoSubTitle}
            onChange={(e) => setLogoSubTitle(e.target.value)}
            size="small"
            fullWidth
            style={{ marginBottom: 16 }}
            sx={{
              "& .MuiInputBase-input": { color: textColor },
              "& .MuiInputLabel-root": { color: labelColor },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "#374151" : "#d1d5db",
              },
            }}
          />
          <RowLabel darkMode={darkMode}>
            Font Size: {logoSubTitleSize}px
          </RowLabel>
          <Slider
            min={10}
            max={34}
            step={1}
            value={logoSubTitleSize}
            onChange={(_, val) => setLogoSubTitleSize(val)}
            sx={{ color: "#3498db", mb: 1 }}
          />
          <ColorSelector
            label="Dark Mode Color"
            value={logoSubTitleDarkColor}
            onChange={setLogoSubTitleDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Color"
            value={logoSubTitleLightColor}
            onChange={setLogoSubTitleLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ══ HEADER SETTINGS ══════════════════════════════════════════════ */}
        <Typography
          variant="h6"
          style={{
            fontWeight: 700,
            color: textColor,
            marginBottom: 18,
            marginTop: 8,
          }}
        >
          Header Settings
        </Typography>

        {/* ── Header Preview ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Header Preview</SectionTitle>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 16,
              gap: 14,
              backgroundImage:
                enableHeaderBackground && headerBackgroundSelected
                  ? `url(${headerBackgroundSelected})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: enableHeaderBackground
                ? undefined
                : darkMode
                  ? "#374151"
                  : "#f9fafb",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            {enableHeaderTitle && (
              <span
                style={{
                  fontSize: headerFontSize,
                  fontWeight: 700,
                  color: darkMode ? headerFontLightColor : headerFontDarkColor,
                }}
              >
                {pathname === "/" ? "Home" : pathname.replace("/pages/", "")}
              </span>
            )}
          </div>
        </SettingsCard>

        {/* ── Header Background ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: enableHeaderBackground ? 12 : 0,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Header Background
            </Typography>
            <Switch
              checked={!!enableHeaderBackground}
              onChange={(e) => setEnableHeaderBackground(e.target.checked)}
              size="small"
            />
          </div>
          {enableHeaderBackground && (
            <ImageStrip
              images={headerBottomBackgroundList}
              selected={headerBackgroundSelected}
              onSelect={setHeaderBackgroundSelected}
              thumbSize={80}
            />
          )}
        </SettingsCard>

        {/* ── Header Font ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Header Title
            </Typography>
            <Switch
              checked={!!enableHeaderTitle}
              onChange={(e) => setEnableHeaderTitle(e.target.checked)}
              size="small"
            />
          </div>
          <RowLabel darkMode={darkMode}>Font Size: {headerFontSize}px</RowLabel>
          <Slider
            min={10}
            max={47}
            step={1}
            value={headerFontSize}
            onChange={(_, val) => setHeaderFontSize(val)}
            sx={{ color: "#3498db", mb: 1 }}
          />
          <ColorSelector
            label="Dark Mode Color"
            value={headerFontDarkColor}
            onChange={setHeaderFontDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Color"
            value={headerFontLightColor}
            onChange={setHeaderFontLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ══ BOTTOM SETTINGS ══════════════════════════════════════════════ */}
        <Typography
          variant="h6"
          style={{ fontWeight: 700, color: textColor, marginBottom: 18, marginTop: 8 }}
        >
          Bottom Settings
        </Typography>

        {/* ── Bottom Preview ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Bottom Preview</SectionTitle>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundImage:
                enableBottomBackground && bottomBackgroundSelected
                  ? `url(${bottomBackgroundSelected})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: enableBottomBackground
                ? undefined
                : darkMode
                ? "#374151"
                : "#f9fafb",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
              padding: "0 8px",
            }}
          >
            {enableBottomItem && [
              { label: "Home", Icon: HomeIcon },
              { label: "Account", Icon: AccountCircleOutlinedIcon },
              { label: "Settings", Icon: CalendarTodayOutlinedIcon },
              { label: "Contact", Icon: EmailOutlinedIcon },
            ].map(({ label, Icon }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6px 13px",
                  borderRadius: 0,
                  backgroundColor:
                    i === 2
                      ? darkMode
                        ? bottomActiveDarkColor
                        : bottomActiveLightColor
                      : "transparent",
                }}
              >
                <Icon
                  style={{
                    fontSize: 20,
                    marginBottom: 2,
                    color:
                      i === 2
                        ? darkMode
                          ? bottomActiveFontDarkColor
                          : bottomActiveFontLightColor
                        : darkMode
                        ? bottomFontDarkColor
                        : bottomFontLightColor,
                  }}
                />
                <span
                  style={{
                    fontSize: bottomFontSize,
                    color:
                      i === 2
                        ? darkMode
                          ? bottomActiveFontDarkColor
                          : bottomActiveFontLightColor
                        : darkMode
                        ? bottomFontDarkColor
                        : bottomFontLightColor,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* ── Bottom Background ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: enableBottomBackground ? 12 : 0,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Bottom Background
            </Typography>
            <Switch
              checked={!!enableBottomBackground}
              onChange={(e) => setEnableBottomBackground(e.target.checked)}
              size="small"
            />
          </div>
          {enableBottomBackground && (
            <ImageStrip
              images={headerBottomBackgroundList}
              selected={bottomBackgroundSelected}
              onSelect={setBottomBackgroundSelected}
              thumbSize={80}
            />
          )}
        </SettingsCard>

        {/* ── Bottom Font ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Bottom Item
            </Typography>
            <Switch
              checked={!!enableBottomItem}
              onChange={(e) => setEnableBottomItem(e.target.checked)}
              size="small"
            />
          </div>
          <RowLabel darkMode={darkMode}>Font Size: {bottomFontSize}px</RowLabel>
          <Slider
            min={8}
            max={20}
            step={1}
            value={bottomFontSize}
            onChange={(_, val) => setBottomFontSize(val)}
            sx={{ color: "#3498db", mb: 1 }}
          />
          <ColorSelector
            label="Dark Mode Color"
            value={bottomFontDarkColor}
            onChange={setBottomFontDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Color"
            value={bottomFontLightColor}
            onChange={setBottomFontLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ── Bottom Active ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Bottom Active Item</SectionTitle>
          <ColorSelector
            label="Dark Mode Background"
            value={bottomActiveDarkColor}
            onChange={setBottomActiveDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Background"
            value={bottomActiveLightColor}
            onChange={setBottomActiveLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Dark Mode Font Color"
            value={bottomActiveFontDarkColor}
            onChange={setBottomActiveFontDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Font Color"
            value={bottomActiveFontLightColor}
            onChange={setBottomActiveFontLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ══ MENU SETTINGS ════════════════════════════════════════════════ */}
        <Typography
          variant="h6"
          style={{ fontWeight: 700, color: textColor, marginBottom: 18, marginTop: 8 }}
        >
          Menu Settings
        </Typography>

        {/* ── Menu Preview ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Menu Preview</SectionTitle>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              backgroundImage:
                enableMenuBackground && menuBackgroundSelected
                  ? `url(${menuBackgroundSelected})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: enableMenuBackground
                ? undefined
                : darkMode
                ? "#374151"
                : "#f9fafb",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
              padding: "6px 0",
            }}
          >
            {enableMenuItem && [
              { label: "Home", Icon: HomeIcon },
              { label: "Account", Icon: AccountCircleOutlinedIcon },
              { label: "Settings", Icon: CalendarTodayOutlinedIcon },
              { label: "Contact", Icon: EmailOutlinedIcon },
            ].map(({ label, Icon }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "7px 16px",
                  backgroundColor:
                    i === 2
                      ? darkMode
                        ? menuActiveDarkColor
                        : menuActiveLightColor
                      : "transparent",
                }}
              >
                <Icon
                  style={{
                    fontSize: 20,
                    color:
                      i === 2
                        ? darkMode
                          ? menuActiveFontDarkColor
                          : menuActiveFontLightColor
                        : darkMode
                        ? menuFontDarkColor
                        : menuFontLightColor,
                  }}
                />
                <span
                  style={{
                    fontSize: menuFontSize,
                    color:
                      i === 2
                        ? darkMode
                          ? menuActiveFontDarkColor
                          : menuActiveFontLightColor
                        : darkMode
                        ? menuFontDarkColor
                        : menuFontLightColor,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* ── Menu Background ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: enableMenuBackground ? 12 : 0,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Menu Background
            </Typography>
            <Switch
              checked={!!enableMenuBackground}
              onChange={(e) => setEnableMenuBackground(e.target.checked)}
              size="small"
            />
          </div>
          {enableMenuBackground && (
            <ImageStrip
              images={menuBackgroundList}
              selected={menuBackgroundSelected}
              onSelect={setMenuBackgroundSelected}
              thumbSize={80}
            />
          )}
        </SettingsCard>

        {/* ── Menu Font ── */}
        <SettingsCard darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.4,
                color: darkMode ? "#e5e7eb" : "#1f2937",
              }}
            >
              Menu Item
            </Typography>
            <Switch
              checked={!!enableMenuItem}
              onChange={(e) => setEnableMenuItem(e.target.checked)}
              size="small"
            />
          </div>
          <RowLabel darkMode={darkMode}>Font Size: {menuFontSize}px</RowLabel>
          <Slider
            min={8}
            max={28}
            step={1}
            value={menuFontSize}
            onChange={(_, val) => setMenuFontSize(val)}
            sx={{ color: "#3498db", mb: 1 }}
          />
          <ColorSelector
            label="Dark Mode Color"
            value={menuFontDarkColor}
            onChange={setMenuFontDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Color"
            value={menuFontLightColor}
            onChange={setMenuFontLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>

        {/* ── Menu Active Item ── */}
        <SettingsCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>Menu Active Item</SectionTitle>
          <ColorSelector
            label="Dark Mode Background"
            value={menuActiveDarkColor}
            onChange={setMenuActiveDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Background"
            value={menuActiveLightColor}
            onChange={setMenuActiveLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Dark Mode Font Color"
            value={menuActiveFontDarkColor}
            onChange={setMenuActiveFontDarkColor}
            colorList={colorList}
            darkMode={darkMode}
          />
          <ColorSelector
            label="Light Mode Font Color"
            value={menuActiveFontLightColor}
            onChange={setMenuActiveFontLightColor}
            colorList={colorList}
            darkMode={darkMode}
          />
        </SettingsCard>
      </div>
    </Layout>
  );
}
