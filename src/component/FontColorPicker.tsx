// React
import { useRef } from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

// Components
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { styled } from '@mui/material/styles';

interface ColorPickerProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FontColorPicker(props: ColorPickerProps) {
    const hiddenRef = useRef<HTMLInputElement>(null);

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setColor(event.target.value);
    };

    const clickColorInput = () => {
        hiddenRef.current?.click();
    }

    return (
        <TextField
            value={props.color}
            label='Background Image'
            size='small'
            onClick={clickColorInput}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <FormatColorTextIcon />
                        <VisuallyHiddenInput
                            type='color'
                            ref={hiddenRef}
                            onChange={handleColorChange}
                        />
                    </InputAdornment>
                ),
                readOnly: true
            }}
        />
    );
}