"use client";

import Box from "@mui/material/Box";
import Header from "./Header";
import Left from "./Left";
import Content from "./Content";
import Bottom from "./Bottom";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header />
      <Left />
      <Content>{children}</Content>
      <Bottom />
    </Box>
  );
}
