"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function DaisyThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      // system or undefined, fallback or remove
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  return null;
}
