// React
import { ReactNode } from 'react';

// Components
import { ButtonBase } from '@mui/material';

interface SquareButtonProps {
    onClick: () => void;
    children?: ReactNode;
}

export default function SquareButton(props: SquareButtonProps) {
    return (
        <ButtonBase
            onClick={props.onClick}
            sx={{
                p: 1,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '4px',
            }}
        >
            {props.children}
        </ButtonBase>
    );
}
