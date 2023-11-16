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
import ConfirmDeleteViewDialog from './ConfirmDeleteViewDialog';
import CustomTimePicker from '../inputs/CustomTimePicker';
import CustomSlider from '../inputs/CustomSlider';
import ColorPicker from '../inputs/ColorPicker';
import FontFamilySelect from '../inputs/FontFamilySelect';
import FontFormatToggleGroup from '../inputs/FontFormatToggleGroup';
import FontSizeField from '../inputs/FontSizeField';
import SquareButton from '../inputs/SquareButton';
import UploadFileField from '../inputs/UploadFileField';
import ViewSettingsPreview from './ViewSettingsPreview';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Services
import { getUid } from '~/services/auth';
import { saveView, ViewSchema } from '~/services/database';
import CustomSelect from '../inputs/CustomSelect';

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
    // Target time countdown will reach 00:00.
    const [targetTime, setTargetTime] = useState<Date | null>(
        getDefaultTime(10, 0, 0, 0)
    );
    // Time to start the countdown. This should be earlier than targetTime.
    const [startTime, setStartTime] = useState<Date | null>(
        getDefaultTime(8, 0, 0, 0)
    );
    const [timeFormat, setTimeFormat] = useState('hh:mm:ss');
    const timeFormatOptions = [
        {
            label: 'hh:mm:ss',
            value: 'hh:mm:ss',
        },
        {
            label: 'hh:mm',
            value: 'hh:mm',
        },
        {
            label: 'mm:ss',
            value: 'mm:ss',
        },
    ];

    // Determines if the user wants their countdown view to be public or not.
    const [publicMode, setPublicMode] = useState(true);
    const togglePublicMode = (event: ChangeEvent<HTMLInputElement>) => {
        setPublicMode(event.target.checked);
    };

    const openViewInNewTab = () => {
        const url = `/view/${props.viewId}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Confirm deletion before actually deleting the view.
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const openConfirmDelete = () => {
        setShowConfirmDelete(true);
    };
    const closeConfirmDelete = () => {
        setShowConfirmDelete(false);
    };
    const onDelete = () => {
        closeDrawer();
    };

    useEffect(() => {
        if (props.viewData) {
            setName(props.viewData.name);
            if (props.viewData.background) {
                // Convert URL string back to File
                fetch(props.viewData.background)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        // Convert the blob to a file object
                        const file = new File(
                            [blob],
                            props.viewData?.backgroundName || 'background',
                            {
                                type: blob.type,
                            }
                        );
                        // Now you can use the file object
                        setBackground(file);
                    })
                    .catch(e => {
                        console.log('Error fetching the file:', e);
                    });
            }
            setOverlayOpacity(props.viewData.overlayOpacity);
            setFontFamily(props.viewData.fontFamily);
            setFontSize(props.viewData.fontSize);
            setFontFormats(props.viewData.fontFormats);
            setFontColor(props.viewData.fontColor);
            setTargetTime(new Date(props.viewData.targetTime));
            setStartTime(new Date(props.viewData.startTime));
            setTimeFormat(props.viewData.timeFormat);
            setPublicMode(props.viewData.publicMode);
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
            const uid = getUid();
            if (uid) {
                const viewObj: ViewSchema<File, Date> = {
                    ownerId: uid,
                    name: name,
                    background: background,
                    backgroundName: background?.name || null,
                    overlayOpacity: overlayOpacity,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    fontFormats: fontFormats,
                    fontColor: fontColor,
                    targetTime: targetTime,
                    startTime: startTime,
                    timeFormat: timeFormat,
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
        }
    };

    return (
        <Drawer open={props.open} anchor='left'>
            <Stack
                direction='column'
                justifyContent='start'
                sx={{ height: '100%' }}
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    sx={{ m: 2 }}
                >
                    <TextField
                        label='Name'
                        value={name}
                        onChange={onNameChange}
                        error={nameError}
                        helperText={nameErrorText}
                        size='small'
                        variant='standard'
                    />
                    <SquareButton onClick={openViewInNewTab}>
                        <OpenInNewIcon />
                    </SquareButton>
                </Stack>

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
                        fontFamily={fontFamily}
                        setFontFamily={setFontFamily}
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
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='space-between'
                        sx={{ pr: 1 }}
                    >
                        <Box flexGrow={1}>
                            <CustomSelect
                                uniqueId='time-format'
                                label='Time Format'
                                options={timeFormatOptions}
                                value={timeFormat}
                                setValue={setTimeFormat}
                                fullWidth
                            />
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    id='public-mode-switch'
                                    name='public-mode'
                                    checked={publicMode}
                                    onChange={togglePublicMode}
                                />
                            }
                            label='Public'
                            disabled
                        />
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ p: 2 }}
                >
                    <Box>
                        {props.add ? null : (
                            <SquareButton onClick={openConfirmDelete}>
                                <DeleteIcon />
                            </SquareButton>
                        )}
                    </Box>
                    <Box>
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
            {props.viewData ? (
                <ConfirmDeleteViewDialog
                    open={showConfirmDelete}
                    viewId={props.viewId}
                    publicMode={props.viewData.publicMode}
                    onCancel={closeConfirmDelete}
                    onDelete={onDelete}
                />
            ) : null}
        </Drawer>
    );
}
