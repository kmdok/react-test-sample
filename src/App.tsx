import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { AppHeader } from "./header/AppHeader";
import { TodoPage } from "./todo/TodoPage";
import {
    COLOR_MODE,
    ColorMode,
    ColorModeContext,
    getDesignTokens,
} from "./color/colors";

function App() {
    const [colorMode, setColorMode] = useState<ColorMode>(COLOR_MODE.DARK);
    const changeColorMode = useMemo(
        () => ({
            changeColorMode: () => {
                setColorMode(prevMode =>
                    prevMode === COLOR_MODE.DARK
                        ? COLOR_MODE.LIGHT
                        : COLOR_MODE.DARK
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(colorMode)),
        [colorMode]
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
