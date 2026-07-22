export type PaletteKey = "crafts" | "sunset" | "hotpink" | "forest" | "candy";

export type PaletteTokens = {
  primary: string;
  "primary-light": string;
  secondary: string;
  "secondary-light": string;
};

export const palettes: Record<PaletteKey, PaletteTokens> = {
  crafts: {
    primary: "#0000ff",
    "primary-light": "#add8e6",
    secondary: "#ffb347",
    "secondary-light": "#ffcc99",
  },
  sunset: {
    primary: "#d2691e",
    "primary-light": "#ffcc99",
    secondary: "#ff8c42",
    "secondary-light": "#ffd29d",
  },
  hotpink: {
    primary: "#f95ca4",
    "primary-light": "#ffc4e0",
    secondary: "#c50900",
    "secondary-light": "#ffdbe9",
  },
  forest: {
    // primary: "#2f4858",
    // "primary-light": "#73a0bd",
    secondary: "#2f5849",
    "secondary-light": "#0f402e",
    primary: "#779e6d",
    "primary-light": "#c3debd",
  },
  candy: {
    primary: "#6c5ce7",
    "primary-light": "#b3aafa",
    secondary: "#fdcb6e",
    "secondary-light": "#ffeaa7",
  },
};
