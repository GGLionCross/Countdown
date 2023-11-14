// React
import { ReactNode } from 'react';

// Components
import { ButtonBase } from '@mui/material';

interface SquareButtonProps {
    children?: ReactNode;
}

export default function SquareButton(props: SquareButtonProps) {
    return (
        <ButtonBase
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
