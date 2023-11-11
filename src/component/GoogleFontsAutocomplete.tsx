import { useEffect, useState} from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { app } from '../services/firebase';

import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

interface GoogleFontsAutocompleteProps {
    font: string;
    setFont: Dispatch<SetStateAction<string>>;
}
interface Font {
    family: string;
}

export default function GoogleFontsAutocomplete(props: GoogleFontsAutocompleteProps) {
    const [fonts, setFonts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${app.options.apiKey}`)
            .then(response => response.json())
            .then(data => {
                setFonts(data.items.map((font: Font) => font.family));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching Google fonts: ", error);
                setLoading(false);
            });
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setFont(event.target.value);
    }

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label='Font'
            value={props.font}
            onChange={onChange}
            variant='outlined'
            size='small'
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
        />
    );

    return (
        <Autocomplete
            options={fonts}
            getOptionLabel={(option) => option}
            renderInput={renderInput}
        />
    );
}