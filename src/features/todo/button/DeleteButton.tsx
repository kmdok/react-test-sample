import { memo } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

type DeleteButtonProps = {
    onClick: (value: string) => void;
    value: string;
};

export const DeleteButton: React.FC<DeleteButtonProps> = memo(props => {
    const { onClick, value } = props;
    const handleClick = () => {
        onClick(value);
    };
    return (
        <Button onClick={handleClick} startIcon={<DeleteIcon />}>
            削除
        </Button>
    );
});

DeleteButton.displayName = "DeleteButton";
