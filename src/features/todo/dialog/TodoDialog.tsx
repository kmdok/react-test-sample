import { memo, useCallback, useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { CloseButton } from "./button/CloseButton";
import { SubmitButton } from "./button/SubmitButton";
import { useTodoList } from "../hooks/useTodoContext";

type TodoDialogProps = {
    open: boolean;
    onClose: () => void;
};
export const TodoDialog: React.FC<TodoDialogProps> = memo(props => {
    const { open, onClose } = props;
    const { todoList, handleAddTodoList } = useTodoList();

    const [toDoTitle, setTodoTitle] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        setTodoTitle("");
        setSubmitDisabled(false);
    }, [open]);

    const handleChangeInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = event.target.value;
            setTodoTitle(inputValue);
            if (todoList.some(todo => todo.title === inputValue)) {
                setSubmitDisabled(true);
                return;
            }
            setSubmitDisabled(false);
        },
        [todoList]
    );

    const handleSubmitTodo = useCallback(() => {
        handleAddTodoList(toDoTitle);
        onClose();
    }, [onClose, handleAddTodoList, toDoTitle]);

    return (
        <Dialog open={open}>
            <DialogTitle>新たなTODOの追加</DialogTitle>
            <DialogContentText>新たなTODOを追加します。</DialogContentText>
            <TextField
                autoFocus
                label="TODOのタイトル"
                onChange={handleChangeInput}
                variant="standard"
            />
            <DialogActions>
                <SubmitButton
                    disabled={submitDisabled}
                    onClick={handleSubmitTodo}
                />
                <CloseButton onClick={onClose} />
            </DialogActions>
        </Dialog>
    );
});

TodoDialog.displayName = "TodoDialog";
