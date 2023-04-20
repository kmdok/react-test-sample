import { createContext } from "react";
import { PaletteMode } from "@mui/material";

export const ColorModeContext = createContext({
    changeColorMode: () => {
        console.log("please override");
    },
});

export const COLOR_MODE = {
    LIGHT: "light" as PaletteMode,
    DARK: "dark" as PaletteMode,
};

export const initialTheme: () => ColorMode = () => COLOR_MODE.DARK;

export type ColorMode = (typeof COLOR_MODE)[keyof typeof COLOR_MODE];

export const getDesignTokens = (mode: ColorMode) => ({
    palette: {
        mode,
        ...(mode === COLOR_MODE.LIGHT
            ? {
                  // override palette values for light mode
                  button: {
                      secondary: "#fff",
                  },
              }
            : {
                  // override palette values for dark mode
              }),
    },
});
