"use client";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const BOTTOM_NAV_HEIGHT = 56;

export default function Content({ children }) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}
    >
      <Toolbar sx={{ flexShrink: 0 }} />
      {children ? (
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>{children}</Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 2, md: 3 },
            pb: { xs: `${BOTTOM_NAV_HEIGHT + 24}px`, md: 3 },
          }}
        >
        </Box>
      )}
    </Box>
  );
}
