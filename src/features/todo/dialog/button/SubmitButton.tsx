import { LibraryAdd as LibraryAddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

type SubmitButtonProps = {
    onClick: () => void;
    disabled: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = props => {
    const { onClick, disabled } = props;
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            startIcon={<LibraryAddIcon />}
        >
            登録
        </Button>
    );
};
