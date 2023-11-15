// React
import { Dispatch, SetStateAction } from 'react';

// Fonts
import { desiredGoogleFonts } from '~/themes/fonts';

// Components
import { MenuItem } from '@mui/material';
import CustomSelect from './CustomSelect';

interface FontFamilySelectProps {
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>;
}

export default function FontFamilySelect(props: FontFamilySelectProps) {
    const renderOptions = () => {
        return desiredGoogleFonts.map((option: string, index: number) => (
            <MenuItem key={index} value={option} sx={{ fontFamily: option }}>
                {option}
            </MenuItem>
        ));
    };

    return (
        <CustomSelect
            uniqueId='font-family'
            label='Font Family'
            value={props.fontFamily}
            setValue={props.setFontFamily}
            renderOptions={renderOptions}
        />
    );
}
