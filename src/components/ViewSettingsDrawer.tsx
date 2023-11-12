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
import CustomSlider from "./inputs/CustomSlider";
import ColorPicker from "./inputs/ColorPicker";
import FontFamilySelect from "./inputs/FontFamilySelect";
import FontFormatToggleGroup from "./FontFormatToggleGroup";
import FontSizeField from "./FontSizeField";
import UploadFileField from "./UploadFileField";
import ViewSettingsPreview from "./ViewSettingsPreview";

// Icons
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

interface ViewSettingsDrawerProps {
    open: boolean;
    add: boolean; // Whether to add or edit an existing view
    close: MouseEventHandler<HTMLButtonElement>;
}

// This will be a slide-up footer
export default function ViewSettingsDrawer(props: ViewSettingsDrawerProps) {
    const [name, setName] = useState('');
    const [background, setBackground] = useState<File | null>(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.5); // Initial opacity for the overlay
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontSize, setFontSize] = useState(64);
    const [fontFormats, setFontFormats] = useState(() => ['']);
    const [fontColor, setFontColor] = useState('#ffffff');

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
                <CustomSlider
                    value={overlayOpacity}
                    setValue={setOverlayOpacity}
                    min={0}
                    max={1}
                    step={0.01}
                />
                <FontFamilySelect
                    font={fontFamily}
                    setFont={setFontFamily}
                />
                <Stack direction='row' spacing={2}>
                    <FontSizeField
                        size={fontSize}
                        setSize={setFontSize}
                        min={36}
                        max={128}
                        step={4}
                    />
                    <FontFormatToggleGroup
                        formats={fontFormats}
                        setFormats={setFontFormats}
                    />
                    <ColorPicker
                        color={fontColor}
                        setColor={setFontColor}
                    >
                        <FormatColorTextIcon />
                    </ColorPicker>
                </Stack>
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
                overlayOpacity={overlayOpacity}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontFormats={fontFormats}
                fontColor={fontColor}
            />
        </Drawer>
    )
}