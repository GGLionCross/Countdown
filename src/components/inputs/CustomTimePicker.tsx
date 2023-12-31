// React
import { Dispatch, SetStateAction } from 'react';

// Components
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface CustomTimePickerProps {
    label: string;
    time: Date | null;
    setTime: Dispatch<SetStateAction<Date | null>>;
    error?: boolean;
    helperText?: string;
}

export default function CustomTimePicker(props: CustomTimePickerProps) {
    const handleTimeChange = (time: Date | null) => {
        props.setTime(time);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={props.label}
                value={props.time}
                onChange={handleTimeChange}
                slotProps={{
                    textField: {
                        size: 'small',
                        error: props.error,
                        helperText: props.helperText,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
