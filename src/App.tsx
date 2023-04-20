import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { AppHeader } from "./header/AppHeader";
import { TodoPage } from "./features/todo/TodoPage";
import {
    COLOR_MODE,
    ColorMode,
    ColorModeContext,
    getDesignTokens,
    initialTheme,
} from "./color/colors";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const [themeValue, setThemeValue] = useLocalStorage<ColorMode>(
        "theme",
        initialTheme()
    );
    const changeColorMode = useMemo(
        () => ({
            changeColorMode: () => {
                setThemeValue(prevStoredValue => {
                    return prevStoredValue === COLOR_MODE.DARK
                        ? COLOR_MODE.LIGHT
                        : COLOR_MODE.DARK;
                });
            },
        }),
        [setThemeValue]
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(themeValue)),
        [themeValue]
    );

    return (
        <ColorModeContext.Provider value={changeColorMode}>
            <ThemeProvider theme={theme}>
                <Box
                    className="App"
                    sx={{
                        height: "100vh",
                        color: "text.primary",
                        bgcolor: "background.default",
                    }}
                >
                    <AppHeader />
                    <TodoPage />
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
