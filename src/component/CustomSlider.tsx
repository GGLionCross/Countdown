// React
import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    useEffect,
    useState
} from 'react';

// Components
import {
    Grid,
    Slider,
    TextField
} from '@mui/material';

interface CustomSliderProps {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    min: number;
    max: number;
    step: number;
}

export default function CustomSlider(props: CustomSliderProps) {
    const [text, setText] = useState(String(props.value));

    useEffect(() => {
        setText(props.value.toFixed(2))
    }, [props.value]);

    const onSliderChange = (_: Event, value: number | number[]) => {
        props.setValue(value as number);
    };

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regex = /^\d?(\.\d{0,2})?$/;

        if (value === '' || regex.test(value)) {
            setText(value);
        }
    };

    const onTextBlur = () => {
        // Format the value on blur
        let value = Number(text);
        // Clamp value between min and max
        value = Math.max(props.min, Math.min(value, props.max));
        props.setValue(value);
        setText(value.toFixed(2));
    };

    const onTextKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // When Enter is pressed, blur the input field
            const input = event.target as HTMLInputElement;
            input.blur();
        }
    }

    return (
        <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={4}>
                <TextField
                    label='Overlay'
                    type='number'
                    value={text}
                    onChange={onTextChange}
                    onBlur={onTextBlur}
                    onKeyUp={onTextKeyUp}
                    size='small'
                    InputLabelProps={{ 
                        // This forces the Input Label not to overlap with our filename
                        shrink: true
                    }}
                    InputProps={{
                        inputProps: {
                            min: props.min,
                            max: props.max,
                            step: props.step,
                            maxLength: 4
                        }
                    }}
                />
            </Grid>
            <Grid item xs={7.5} sx={{ px: 1 }}>
                <Slider
                    value={props.value}
                    onChange={onSliderChange}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    size='small'
                />
            </Grid>
        </Grid>
    );
}