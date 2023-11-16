// React
import { useEffect, useState } from 'react';

// Components
import { Box } from '@mui/material';

// Services
import { ViewSchema } from '~/services/database';

interface ViewPageProps {
    viewData: ViewSchema<string, string>;
}

export default function ViewPage(props: ViewPageProps) {
    const targetTime = new Date(props.viewData.targetTime).getTime();
    const startTime = new Date(props.viewData.startTime).getTime();
    const [timer, setTimer] = useState(targetTime - new Date().getTime());

    useEffect(() => {
        // Update the countdown every second
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeLeft = targetTime - now.getTime();

            if (now.getTime() < startTime) {
                // Don't start until startTime has passed
                setTimer(targetTime - startTime);
            } else if (timeLeft <= 0) {
                // If the countdown is over, clear the interval
                clearInterval(intervalId);
                setTimer(0);
            } else {
                setTimer(timeLeft);
            }
        }, 1000); // Update every second

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, [targetTime, startTime]);

    // Convert milliseconds to a readable format
    const formatTime = (milliseconds: number, format: string) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        const hours = Math.floor((milliseconds / 1000 / 3600) % 24);

        let timeString = '';
        if (format.includes('hh:') && hours > 0) {
            timeString += `${hours}:`;
        }
        if (format.includes('mm:')) {
            if (hours > 0 && minutes > 0) {
                timeString += `${minutes.toString().padStart(2, '0')}`;
            } else if (minutes > 0) {
                timeString += `${minutes}`;
            }
        }
        if (format.includes('ss')) {
            if (hours > 0 || minutes > 0) {
                timeString += `:${seconds.toString().padStart(2, '0')}`;
            } else {
                timeString += `${seconds}`;
            }
        }
        return timeString;
    };

    const pageStyle = {
        backgroundImage: `url(${props.viewData?.background})`,
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        backgroundSize: 'cover', // Cover the entire area of the element
    };
    const countdownStyle = {
        zIndex: 2,
        fontFamily: props.viewData.fontFamily, // TypeScript should infer this is string
        color: props.viewData.fontColor, // TypeScript should infer this is string
        fontSize: `${props.viewData?.fontSize}vh`,
        fontWeight: props.viewData.fontFormats.includes('bold') ? 700 : 400,
    };
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            width='100vw'
            height='100vh'
            sx={pageStyle}
        >
            <Box sx={countdownStyle}>
                {formatTime(timer, props.viewData.timeFormat)}
            </Box>
            <Box
                position='absolute'
                sx={{
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: props.viewData.overlayOpacity,
                }}
            ></Box>
        </Box>
    );
}
