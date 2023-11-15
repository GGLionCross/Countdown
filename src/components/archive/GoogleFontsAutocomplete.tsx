// ! Not currently in use, but kept in case I need an Autocomplete template

// React
import { HTMLAttributes } from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

// Fonts
import { desiredGoogleFonts } from '~/themes/fonts';

// Components
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface GoogleFontsAutocompleteProps {
    font: string;
    setFont: Dispatch<SetStateAction<string>>;
}

export default function GoogleFontsAutocomplete(
    props: GoogleFontsAutocompleteProps
) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setFont(event.target.value);
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label='Font'
            value={props.font}
            onChange={onChange}
            variant='outlined'
            size='small'
        />
    );

    const renderOption = (
        props: HTMLAttributes<HTMLLIElement>,
        option: string
    ) => {
        // Load the font when rendering the option
        return (
            <li
                {...props}
                style={{
                    fontFamily: option,
                }}
            >
                {option}
            </li>
        );
    };

    return (
        <Autocomplete
            options={desiredGoogleFonts}
            getOptionLabel={option => option}
            renderInput={renderInput}
            renderOption={renderOption}
        />
    );
}
