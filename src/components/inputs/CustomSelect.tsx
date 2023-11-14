// React
import { Dispatch, SetStateAction } from 'react';

// Components
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

interface CustomSelectOption {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    uniqueId: string; // Unique identifier required for both select and label
    label: string; // Goes in InputLabel component
    options: CustomSelectOption[]; // Array of labels and values
    value: string | number; // The passed state of selected value
    setValue: Dispatch<SetStateAction<string | number>>; // The setter for value
}

export default function CustomSelect(props: CustomSelectProps) {
    const labelId = `${props.uniqueId}-label`;
    const selectId = `${props.uniqueId}-select`;
    const handleChange = (event: SelectChangeEvent) => {
        props.setValue(event.target.value);
    };
    return (
        <FormControl>
            <InputLabel id={labelId}>{props.label}</InputLabel>
            <Select
                labelId={labelId}
                id={selectId}
                label={props.label}
                onChange={handleChange}
            >
                {props.options.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
