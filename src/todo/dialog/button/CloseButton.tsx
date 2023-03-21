import { Close as CloseIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

type CloseButtonProps = {
    onClick: () => void;
};

export const CloseButton: React.FC<CloseButtonProps> = props => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} startIcon={<CloseIcon />}>
            閉じる
        </Button>
    );
};
