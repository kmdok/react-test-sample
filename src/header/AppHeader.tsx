import { AppBar, Box, Button, useTheme } from "@mui/material";
import { memo, useContext } from "react";
import { ColorModeContext } from "../color/colors";

export const AppHeader = memo(() => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <AppBar>
            <Box
                sx={{
                    textAlign: "right",
                    mr: 1,
                }}
            >
                <Button
                    sx={{
                        color: "button.secondary",
                    }}
                    onClick={colorMode.changeColorMode}
                >
                    {theme.palette.mode}
                </Button>
            </Box>
        </AppBar>
    );
});

AppHeader.displayName = "AppHeader";
