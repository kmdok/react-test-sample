import { memo, useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AddButton } from "./button/AddButton";
import { TodoDialog } from "./dialog/TodoDialog";
import { Title, TodoStatus, TODO_STATUS } from "./table/common";
import { Table } from "./table/Table";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type TodoType = {
    title: string;
    status: TodoStatus;
};

const initialTodoList: TodoType[] = [
    { title: "削除機能つける", status: TODO_STATUS.DONE },
    { title: "ローカルストレージに保存する", status: TODO_STATUS.UN_DONE },
    { title: "テストを書く", status: TODO_STATUS.UN_DONE },
];

export const TodoPage: React.FC = memo(() => {
    const [storageTodoList, setStorageTodoList] = useLocalStorage<TodoType[]>(
        "todoList",
        initialTodoList
    );
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddTodoList = useCallback(
        (title: Title) => {
            setStorageTodoList([
                ...storageTodoList,
                { title, status: TODO_STATUS.UN_DONE },
            ]);
        },
        [setStorageTodoList, storageTodoList]
    );

    const handleChangeTodoStatus = useCallback(
        (title: string, checked: TodoStatus) => {
            const newTodoList = storageTodoList.map(todo => {
                if (todo.title === title) {
                    return { title, status: checked };
                }
                return todo;
            });
            setStorageTodoList(newTodoList);
        },
        [setStorageTodoList, storageTodoList]
    );

    const handleDeleteTodo = useCallback(
        (title: string) => {
            const newTodoList = storageTodoList.filter(
                todo => todo.title !== title
            );
            setStorageTodoList(newTodoList);
        },
        [setStorageTodoList, storageTodoList]
    );

    const handleOpenDialog = useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);

    const todoTitleList = useMemo(() => {
        return storageTodoList.map(todo => todo.title);
    }, [storageTodoList]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 10,
            }}
        >
            <Table
                todoList={storageTodoList}
                onChecked={handleChangeTodoStatus}
                onDelete={handleDeleteTodo}
            />
            <AddButton onClick={handleOpenDialog} />
            <TodoDialog
                todoTitleList={todoTitleList}
                open={dialogOpen}
                onSubmit={handleAddTodoList}
                onClose={handleCloseDialog}
            />
        </Box>
    );
});

TodoPage.displayName = "TodoPage";
