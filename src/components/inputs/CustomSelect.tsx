// React
import { Dispatch, ReactNode, SetStateAction } from 'react';

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
    value: string;
}

interface CustomSelectProps {
    uniqueId: string; // Unique identifier required for both select and label
    label: string; // Goes in InputLabel component
    options?: CustomSelectOption[]; // Array of options
    renderOptions?: () => ReactNode;
    value: string; // The passed state of selected value
    setValue: Dispatch<SetStateAction<string>>; // The setter for value
    fullWidth?: boolean; // Whether or not select should expand to full width
}

export default function CustomSelect(props: CustomSelectProps) {
    const labelId = `${props.uniqueId}-label`;
    const selectId = `${props.uniqueId}-select`;
    const handleChange = (event: SelectChangeEvent<string>) => {
        props.setValue(event.target.value);
    };
    const renderOptions = () => {
        if (props.options) {
            return props.options.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                    {item.label}
                </MenuItem>
            ));
        } else if (props.renderOptions) {
            return props.renderOptions();
        }
    };
    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id={labelId} htmlFor={selectId} size='small'>
                {props.label}
            </InputLabel>
            <Select
                labelId={labelId}
                id={selectId}
                name={props.uniqueId}
                label={props.label}
                value={props.value}
                onChange={handleChange}
                size='small'
            >
                {renderOptions()}
            </Select>
        </FormControl>
    );
}
