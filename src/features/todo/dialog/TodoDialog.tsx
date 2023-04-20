import {
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { Title } from "../table/common";
import { CloseButton } from "./button/CloseButton";
import { SubmitButton } from "./button/SubmitButton";

type TodoDialogProps = {
    todoTitleList: Title[];
    open: boolean;
    onSubmit: (title: string) => void;
    onClose: () => void;
};
export const TodoDialog: React.FC<TodoDialogProps> = memo(props => {
    const { todoTitleList, open, onSubmit, onClose } = props;

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
            if (todoTitleList.some(todo => todo === inputValue)) {
                setSubmitDisabled(true);
                return;
            }
            setSubmitDisabled(false);
        },
        [todoTitleList]
    );

    const handleSubmitTodo = useCallback(() => {
        onSubmit(toDoTitle);
        onClose();
    }, [onClose, onSubmit, toDoTitle]);

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
