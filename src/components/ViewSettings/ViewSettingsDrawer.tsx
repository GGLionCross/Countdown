// React
import { ChangeEvent, useEffect, useState } from 'react';

// Components
import {
    Box,
    Button,
    Drawer,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomTimePicker from '../inputs/CustomTimePicker';
import CustomSlider from '../inputs/CustomSlider';
import ColorPicker from '../inputs/ColorPicker';
import FontFamilySelect from '../inputs/FontFamilySelect';
import FontFormatToggleGroup from '../inputs/FontFormatToggleGroup';
import FontSizeField from '../inputs/FontSizeField';
import UploadFileField from '../inputs/UploadFileField';
import ViewSettingsPreview from './ViewSettingsPreview';

// Icons
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

// Services
import { saveView, ViewSchema } from '~/services/database';

interface ViewSettingsDrawerProps {
    viewId: string | null; // View Id to edit; null means adding view.
    viewData: ViewSchema<string, string> | null; // View Data to edit; null means adding view.
    open: boolean;
    add: boolean; // Whether to add or edit an existing view
    close: () => void;
}

// This will be a slide-up footer
export default function ViewSettingsDrawer(props: ViewSettingsDrawerProps) {
    const [name, setName] = useState('View Name');
    const [nameError, setNameError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [background, setBackground] = useState<File | null>(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.5); // Initial opacity for the overlay
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontSize, setFontSize] = useState(40);
    const [fontFormats, setFontFormats] = useState(() => ['']);
    const [fontColor, setFontColor] = useState('#ffffff');
    const getDefaultTime = (
        hr: number,
        min: number,
        sec: number,
        ms: number
    ) => {
        const defaultTime = new Date();
        // Set to 8am by default
        defaultTime.setHours(hr, min, sec, ms);
        return defaultTime;
    };
    const [targetTime, setTargetTime] = useState<Date | null>(
        getDefaultTime(10, 0, 0, 0)
    );
    const [startTime, setStartTime] = useState<Date | null>(
        getDefaultTime(8, 0, 0, 0)
    );
    const [publicMode, setPublicMode] = useState(false);
    const togglePublicMode = (event: ChangeEvent<HTMLInputElement>) => {
        setPublicMode(event.target.checked);
    };

    useEffect(() => {
        if (props.viewData) {
            setName(props.viewData.name);
        }
    }, [props.viewData]);

    const [targetTimeError, setTargetTimeError] = useState(false);
    const [targetTimeErrorText, setTargetTimeErrorText] = useState('');
    const [startTimeError, setStartTimeError] = useState(false);
    const [startTimeErrorText, setStartTimeErrorText] = useState('');

    const [showPreview, setShowPreview] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setNameError(name.trim() === '');
        setNameErrorText(name.trim() === '' ? 'Please enter a name.' : '');
    }, [name]);

    useEffect(() => {
        setTargetTimeError(targetTime === null);
        setTargetTimeErrorText(
            targetTime === null ? 'Please enter a target time.' : ''
        );
    }, [targetTime]);

    useEffect(() => {
        // Reset the error from the beginning
        // If there are errors, these will be overwritten
        setStartTimeError(false);
        setStartTimeErrorText('');

        const errors = [
            {
                error: startTime === null,
                errorText: 'Please enter a start time.',
            },
            {
                error: startTime && targetTime && startTime >= targetTime,
                errorText:
                    'Please select a start time earlier than your target.',
            },
        ];
        for (const e of errors) {
            if (e.error) {
                setStartTimeError(true);
                setStartTimeErrorText(e.errorText);
            }
        }
    }, [targetTime, startTime]);

    useEffect(() => {
        if (props.open) {
            const timer = setTimeout(() => {
                setShowPreview(props.open);
            }, 500); // delay in milliseconds

            return () => clearTimeout(timer);
        }
    }, [props.open]);

    const closeDrawer = () => {
        setShowPreview(false); // Fade preview out
        // Wait, then close the drawer
        setTimeout(() => {
            props.close();
        }, 500); // Delay of 2 seconds
    };

    const handleSave = async () => {
        if (targetTime && startTime) {
            const viewObj: ViewSchema<File, Date> = {
                name: name,
                background: background,
                overlayOpacity: overlayOpacity,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontFormats: fontFormats,
                fontColor: fontColor,
                targetTime: targetTime,
                startTime: startTime,
                publicMode: publicMode,
            };
            setSaveLoading(true);
            try {
                await saveView(props.viewId, viewObj);
                // If no errors were caught
                closeDrawer();
            } catch (error: unknown) {
                console.error('An error occurred while saving: ', error);
            } finally {
                setSaveLoading(false);
            }
        }
    };

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
                    sx={{ p: 2, overflow: 'auto' }}
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
                            min={20}
                            max={60}
                            step={2}
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
                        error={targetTimeError}
                        helperText={targetTimeErrorText}
                    />
                    <CustomTimePicker
                        label='Start'
                        time={startTime}
                        setTime={setStartTime}
                        error={startTimeError}
                        helperText={startTimeErrorText}
                    />
                    <Stack direction='row' justifyContent='end'>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={publicMode}
                                    onChange={togglePublicMode}
                                />
                            }
                            label='Public'
                        />
                    </Stack>
                </Stack>
                <Box display='flex' justifyContent='center' sx={{ p: 2 }}>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <LoadingButton
                        variant='contained'
                        onClick={handleSave}
                        disabled={
                            nameError || targetTimeError || startTimeError
                        }
                        loading={saveLoading}
                    >
                        {props.add ? 'Add' : 'Save'}
                    </LoadingButton>
                </Box>
            </Stack>
            <ViewSettingsPreview
                show={showPreview}
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