"use client";

import React, { useState, useContext, useMemo, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Layout from "../../components/Layout";
import { useLoading } from "../../hooks/useLoading";

export default function ContactPage() {
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
  } = useContext(GlobalContext);

  const { showLoading, hideLoading } = useLoading();

  // Show loading on page mount
  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div
        style={{
          padding: "24px 24px 48px 24px",
          overflowY: "auto",
          height: "100%",
          background: darkMode ? "#111827" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: mobileDevice ? "column" : "row",
            gap: 16,
            marginBottom: 24,
          }}
        ></div>
      </div>
    </Layout>
  );
}
