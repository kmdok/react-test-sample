import { memo, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { AddButton } from "./button/AddButton";
import { TodoDialog } from "./dialog/TodoDialog";
import { TodoProvider } from "./hooks/useTodoContext";
import { Table } from "./table/Table";

export const TodoPage: React.FC = memo(() => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);

    return (
        <TodoProvider>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 10,
                }}
            >
                <Table />
                <AddButton onClick={handleOpenDialog} />
                <TodoDialog open={dialogOpen} onClose={handleCloseDialog} />
            </Box>
        </TodoProvider>
    );
});

TodoPage.displayName = "TodoPage";
