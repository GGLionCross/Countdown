// React
import { useEffect, useState } from "react";

// Components
import { Box, Paper } from "@mui/material";


interface ViewSettingsPreviewProps {
    background: File | null;
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
        <Box
            sx={{
                position: 'fixed',
                right: 0,
                display: 'flex',
                alignItems: 'center',
                pr: 4,
                height: '100vh'
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    height: '54vh',
                    width: '96vh', // 16:9 = 96:54
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center', // Center the background image
                    backgroundRepeat: 'no-repeat', // Do not repeat the image
                    backgroundSize: 'cover', // Cover the entire area of the element
                }}
            >

            </Paper>
        </Box>
    )
}