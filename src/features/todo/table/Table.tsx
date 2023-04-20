import { Checkbox, FormControlLabel } from "@mui/material";
import { memo, useCallback } from "react";
import { DeleteButton } from "../button/DeleteButton";
import { Todo, TodoList, TodoStatus, TODO_STATUS } from "./common";

type TableProps = {
    todoList: TodoList;
    onChecked: (title: string, status: TodoStatus) => void;
    onDelete: (title: string) => void;
};

export const Table: React.FC<TableProps> = memo(props => {
    const { todoList, onChecked, onDelete } = props;

    const handleChecked = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            onChecked(event.target.value, checked);
        },
        [onChecked]
    );

    const handleClickDelete = useCallback(
        (title: string) => {
            onDelete(title);
        },
        [onDelete]
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
