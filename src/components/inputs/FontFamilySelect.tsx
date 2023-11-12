// React
import { Dispatch, SetStateAction } from 'react';

// Fonts
import { desiredGoogleFonts } from '../../themes/fonts';

// Components
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';

interface FontFamilySelectProps {
    font: string;
    setFont: Dispatch<SetStateAction<string>>;
}

export default function FontFamilySelect(props: FontFamilySelectProps) {

    const onChange = (event: SelectChangeEvent<string>) => {
        props.setFont(event.target.value);
    }

    const renderOptions = () => {
        return desiredGoogleFonts.map((option: string, index: number) => (
            <MenuItem key={index} value={option} sx={{ fontFamily: option }}>
                {option}
            </MenuItem>
        ));
    }

    return (
        <FormControl>
            <InputLabel id='font-family-label' size='small'>
                Font Family
            </InputLabel>
            <Select
                labelId='font-family-label'
                id='font-family-select'
                name='font-family'
                label='Font Family'
                value={props.font}
                onChange={onChange}
                size='small'
            >
                {renderOptions()}
            </Select>
        </FormControl>
    );
}