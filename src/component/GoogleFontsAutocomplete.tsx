import { useEffect, useState} from 'react';

import { app } from '../services/firebase';

import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

interface Font {
    family: string;
}

export default function GoogleFontsAutocomplete() {
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

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label='Font'
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