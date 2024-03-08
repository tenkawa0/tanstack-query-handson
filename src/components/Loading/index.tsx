import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <CircularProgress size={16} sx={{ color: "text.disabled" }} />
      <Typography
        variant="body2"
        sx={{ color: "text.disabled", lineHeight: "38px" }}
      >
        Loading...
      </Typography>
    </Stack>
  );
};
