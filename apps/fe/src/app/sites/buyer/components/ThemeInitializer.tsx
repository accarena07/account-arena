"use client";

import { useEffect } from "react";
import { applyInitialTheme } from "./theme";

export default function ThemeInitializer() {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return null;
}
