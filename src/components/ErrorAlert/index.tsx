import React from "react";
import { Alert } from "@mui/material";

export default function ErrorAlert() {
  return (
    <Alert variant="outlined" severity="error">
      エラーが発生しました
    </Alert>
  );

};

