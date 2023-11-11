// React
import { MouseEventHandler, useState } from "react";

// Components
import {
    Box,
    Button,
    Card,
    Paper,
    Slide,
    Stack,
    TextField
} from "@mui/material";
import UploadFileField from "./UploadFileField";
import GoogleFontsAutocomplete from "./GoogleFontsAutocomplete";

interface EditViewProps {
    show: boolean;
    add: boolean; // Whether to add or edit an existing view
    close: MouseEventHandler<HTMLButtonElement>;
}

// This will be a slide-up footer
export default function EditView(props: EditViewProps) {
    const footerStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        // bgcolor: 'background.paper',
        // boxShadow: 1,
        // elevation: 2
    }
    const [filename, setFilename] = useState('');

    return (
        <Slide in={props.show} direction='up' mountOnEnter unmountOnExit>
            <Paper sx={footerStyle}>
                <Stack direction='row'>
                    <Stack direction='column' spacing={2}>
                        <TextField label='Name' size='small'></TextField>
                        <UploadFileField
                            accept='image/*'
                            filename={filename}
                            setFilename={setFilename}
                        />
                        <GoogleFontsAutocomplete />
                    </Stack>
                    <Card id='countdown-preview'>

                    </Card>
                </Stack>
                <Box display='flex' justifyContent='center' sx={{ pt: 2 }}>
                    <Button onClick={props.close}>
                        Cancel
                    </Button>
                    <Button variant="contained">
                        {props.add ? 'Add' : 'Save'}
                    </Button>
                </Box>
            </Paper>
        </Slide>
    )
}