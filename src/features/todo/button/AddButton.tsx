import { memo } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

type AddButtonProps = {
    onClick: () => void;
};

export const AddButton: React.FC<AddButtonProps> = memo(props => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} startIcon={<AddIcon />}>
            追加
        </Button>
    );
});

AddButton.displayName = "AddButton";
