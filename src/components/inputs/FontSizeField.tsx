// React
import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    useState,
} from 'react';

// Components
import { InputAdornment, TextField } from '@mui/material';

interface FontSizeFieldProps {
    size: number;
    setSize: Dispatch<SetStateAction<number>>;
    min?: number;
    max?: number;
    step?: number;
}

export default function FontSizeField(props: FontSizeFieldProps) {
    const [text, setText] = useState(props.size.toString());

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regex = /^\d+$/;

        if (value === '' || regex.test(value)) {
            setText(value);
        }
    };

    const onTextBlur = () => {
        // Format the value on blur
        let value = Number(text);
        // Clamp value between min and max
        value = Math.max(props.min || 0, Math.min(value, props.max || 100));
        props.setSize(value);
        setText(value.toFixed(0));
    };

    const onTextKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // When Enter is pressed, blur the input field
            const input = event.target as HTMLInputElement;
            input.blur();
        }
    };

    return (
        <TextField
            label='Font Size'
            type='number'
            value={text}
            onChange={onTextChange}
            onBlur={onTextBlur}
            onKeyUp={onTextKeyUp}
            size='small'
            InputLabelProps={{
                // This forces the Input Label not to overlap with our filename
                shrink: true,
            }}
            InputProps={{
                inputProps: {
                    min: props.min,
                    max: props.max,
                    step: props.step || 1,
                    maxLength: 4,
                },
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
        />
    );
}
