// React
import { useEffect, useState } from 'react';

// Components
import { Box, Fade, Paper } from '@mui/material';

interface ViewSettingsPreviewProps {
    show: boolean;
    background: File | null;
    overlayOpacity: number;
    fontFamily: string;
    fontSize: number;
    fontFormats: string[];
    fontColor: string;
}

export default function ViewSettingsPreview(props: ViewSettingsPreviewProps) {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        // Only proceed if background is a File object
        if (props.background instanceof File) {
            const newUrl = URL.createObjectURL(props.background);

            // Set the new background URL
            setBackgroundImage(newUrl);

            // Clean up function to revoke the object URL when the component unmounts or the background changes
            return () => {
                URL.revokeObjectURL(newUrl);
            };
        }
    }, [props.background]);

    return (
        <Fade in={props.show}>
            <Box
                sx={{
                    position: 'fixed',
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    pr: 4,
                    height: '100vh',
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        height: '54vh',
                        width: '96vh', // 16:9 = 96:54
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: 'center', // Center the background image
                        backgroundRepeat: 'no-repeat', // Do not repeat the image
                        backgroundSize: 'cover', // Cover the entire area of the element
                    }}
                >
                    <Box
                        sx={{
                            zIndex: 2,
                            color: props.fontColor,
                            fontFamily: props.fontFamily,
                            fontSize: props.fontSize,
                            fontWeight: props.fontFormats.includes('bold')
                                ? 700
                                : 400,
                            // fontStyle: props.fontFormats.includes('italic') ? 'italic' : 'none',
                            // textDecoration: props.fontFormats.includes('underline') ? 'underline' : 'none'
                        }}
                    >
                        12:34
                    </Box>
                    <Box
                        position='absolute'
                        sx={{
                            zIndex: 1,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                            opacity: props.overlayOpacity,
                        }}
                    ></Box>
                </Paper>
            </Box>
        </Fade>
    );
}
