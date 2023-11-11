// React
import {
    ChangeEvent,
    MouseEventHandler,
    useState
} from "react";

// Components
import {
    Box,
    Button,
    Drawer,
    Stack,
    TextField
} from "@mui/material";
import FontColorPicker from "./FontColorPicker";
import GoogleFontsAutocomplete from "./GoogleFontsAutocomplete";
import UploadFileField from "./UploadFileField";
import ViewSettingsPreview from "./ViewSettingsPreview";

interface ViewSettingsDrawerProps {
    open: boolean;
    add: boolean; // Whether to add or edit an existing view
    close: MouseEventHandler<HTMLButtonElement>;
}

// This will be a slide-up footer
export default function ViewSettingsDrawer(props: ViewSettingsDrawerProps) {
    const [name, setName] = useState('');
    const [background, setBackground] = useState<File | null>(null);
    const [font, setFont] = useState('');
    const [fontColor, setFontColor] = useState('');

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    return (
        <Drawer open={props.open} anchor='left'>
            <Stack direction='column' spacing={2} sx={{ p: 2 }}>
                <TextField
                    label='Name'
                    value={name}
                    onChange={onNameChange}
                    size='small'
                    variant='standard'
                />
                <UploadFileField
                    accept='image/*'
                    file={background}
                    setFile={setBackground}
                />
                <GoogleFontsAutocomplete
                    font={font}
                    setFont={setFont}
                />
                <FontColorPicker
                    color={fontColor}
                    setColor={setFontColor}
                />
            </Stack>
            <Box display='flex' justifyContent='center' sx={{ pt: 2 }}>
                <Button onClick={props.close}>
                    Cancel
                </Button>
                <Button variant="contained">
                    {props.add ? 'Add' : 'Save'}
                </Button>
            </Box>
            <ViewSettingsPreview
                background={background}
            />
        </Drawer>
    )
}