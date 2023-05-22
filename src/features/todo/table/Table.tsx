import { memo, useCallback } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Todo, TodoStatus, TODO_STATUS } from "./common";
import { DeleteButton } from "../button/DeleteButton";
import { useTodoList } from "../hooks/useTodoContext";

export const Table: React.FC = memo(props => {
    const { todoList, handleChangeTodoStatus, handleDeleteTodo } =
        useTodoList();

    const handleChecked = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            handleChangeTodoStatus(event.target.value, checked);
        },
        [handleChangeTodoStatus]
    );

    const handleClickDelete = useCallback(
        (title: string) => {
            handleDeleteTodo(title);
        },
        [handleDeleteTodo]
    );

    const rowStyle = useCallback((status: TodoStatus): object => {
        return status === TODO_STATUS.DONE
            ? {
                  textAlign: "left",
                  minWidth: 300,
                  textDecoration: "line-through",
              }
            : { textAlign: "left", minWidth: 300 };
    }, []);

    const bodyRow = useCallback(
        (todo: Todo) => {
            return (
                <tr key={todo.title} className="table-body">
                    <td className="title" style={rowStyle(todo.status)}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={todo.title}
                                    checked={todo.status}
                                    onChange={handleChecked}
                                />
                            }
                            label={todo.title}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <DeleteButton
                            value={todo.title}
                            onClick={handleClickDelete}
                        />
                    </td>
                </tr>
            );
        },
        [handleChecked, handleClickDelete, rowStyle]
    );

    return (
        <table className="Table">
            <thead>
                <tr>
                    <th colSpan={2}>タイトル</th>
                </tr>
            </thead>
            <tbody>{todoList.map(bodyRow)}</tbody>
        </table>
    );
});

Table.displayName = "Table";
