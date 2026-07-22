"use client";

import { PaletteKey, palettes } from "@/lib/palettes";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  currentPalette: PaletteKey;
  setPalette: (key: PaletteKey) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "site-palette";
const DEFAULT_PALETTE: PaletteKey = "crafts";

function applyPalette(key: PaletteKey) {
  const tokens = palettes[key];
  const root = document.documentElement;
  Object.entries(tokens).forEach(([tokenKey, value]) => {
    root.style.setProperty(`--color-${tokenKey}`, value);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentPalette, setCurrentPalette] =
    useState<PaletteKey>(DEFAULT_PALETTE);

  // Draait alleen client-side, na de eerste (matchende) render — kiest dan
  // pas een opgeslagen of willekeurige palette en past die toe.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PaletteKey | null;
    const keys = Object.keys(palettes) as PaletteKey[];
    const chosen =
      stored && palettes[stored]
        ? stored
        : keys[Math.floor(Math.random() * keys.length)];

    setCurrentPalette(chosen);
    applyPalette(chosen);
  }, []);

  const setPalette = (key: PaletteKey) => {
    setCurrentPalette(key);
    applyPalette(key);
    localStorage.setItem(STORAGE_KEY, key);
  };

  return (
    <ThemeContext.Provider value={{ currentPalette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
