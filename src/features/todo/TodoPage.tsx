import { memo, useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AddButton } from "./button/AddButton";
import { TodoDialog } from "./dialog/TodoDialog";
import { Title, TodoStatus, TODO_STATUS } from "./table/common";
import { Table } from "./table/Table";

const initialTodoList = [
    { title: "削除機能つける", status: TODO_STATUS.DONE },
    { title: "ローカルストレージに保存する", status: TODO_STATUS.UN_DONE },
    { title: "テストを書く", status: TODO_STATUS.UN_DONE },
];

export const TodoPage: React.FC = memo(() => {
    const [todoList, setTodoList] = useState(initialTodoList);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddTodoList = useCallback(
        (title: Title) => {
            setTodoList([...todoList, { title, status: TODO_STATUS.UN_DONE }]);
        },
        [todoList]
    );

    const handleChangeTodoStatus = useCallback(
        (title: string, checked: TodoStatus) => {
            const newTodoList = todoList.map(todo => {
                if (todo.title === title) {
                    return { title, status: checked };
                }
                return todo;
            });
            setTodoList(newTodoList);
        },
        [todoList]
    );

    const handleDeleteTodo = useCallback(
        (title: string) => {
            const newTodoList = todoList.filter(todo => todo.title !== title);
            setTodoList(newTodoList);
        },
        [todoList]
    );

    const handleOpenDialog = useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);

    const todoTitleList = useMemo(() => {
        return todoList.map(todo => todo.title);
    }, [todoList]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 10,
            }}
        >
            <Table
                todoList={todoList}
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
