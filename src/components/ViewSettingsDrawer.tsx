// React
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';

// Components
import { Box, Button, Drawer, Stack, TextField } from '@mui/material';
import CustomTimePicker from './inputs/CustomTimePicker';
import CustomSlider from './inputs/CustomSlider';
import ColorPicker from './inputs/ColorPicker';
import FontFamilySelect from './inputs/FontFamilySelect';
import FontFormatToggleGroup from './inputs/FontFormatToggleGroup';
import FontSizeField from './inputs/FontSizeField';
import UploadFileField from './inputs/UploadFileField';
import ViewSettingsPreview from './ViewSettingsPreview';

// Icons
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

interface ViewSettingsDrawerProps {
    open: boolean;
    add: boolean; // Whether to add or edit an existing view
    close: MouseEventHandler<HTMLButtonElement>;
}

// This will be a slide-up footer
export default function ViewSettingsDrawer(props: ViewSettingsDrawerProps) {
    const [name, setName] = useState('View Name');
    const [nameError, setNameError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [background, setBackground] = useState<File | null>(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.5); // Initial opacity for the overlay
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontSize, setFontSize] = useState(64);
    const [fontFormats, setFontFormats] = useState(() => ['']);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [targetTime, setTargetTime] = useState<Date | null>(() => {
        const initialTime = new Date();
        // Set to 10am by default
        initialTime.setHours(10, 0, 0, 0);
        return initialTime;
    });
    const [startTime, setStartTime] = useState<Date | null>(() => {
        const initialTime = new Date();
        // Set to 8am by default
        initialTime.setHours(8, 0, 0, 0);
        return initialTime;
    });

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setNameError(name.trim() === '');
        setNameErrorText(name.trim() === '' ? 'Please enter a name.' : '');
    }, [name]);

    return (
        <Drawer open={props.open} anchor='left'>
            <Stack
                direction='column'
                justifyContent='start'
                sx={{ height: '100%' }}
            >
                <TextField
                    label='Name'
                    value={name}
                    onChange={onNameChange}
                    error={nameError}
                    helperText={nameErrorText}
                    size='small'
                    variant='standard'
                    sx={{ m: 2 }}
                />
                <Stack
                    direction='column'
                    spacing={2}
                    sx={{ px: 2, overflow: 'auto' }}
                >
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
                        <ColorPicker color={fontColor} setColor={setFontColor}>
                            <FormatColorTextIcon />
                        </ColorPicker>
                    </Stack>
                    <CustomTimePicker
                        label='Target'
                        time={targetTime}
                        setTime={setTargetTime}
                    />
                    <CustomTimePicker
                        label='Start'
                        time={startTime}
                        setTime={setStartTime}
                    />
                </Stack>
                <Box display='flex' justifyContent='center' sx={{ p: 2 }}>
                    <Button onClick={props.close}>Cancel</Button>
                    <Button variant='contained'>
                        {props.add ? 'Add' : 'Save'}
                    </Button>
                </Box>
            </Stack>
            <ViewSettingsPreview
                background={background}
                overlayOpacity={overlayOpacity}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontFormats={fontFormats}
                fontColor={fontColor}
            />
        </Drawer>
    );
}
