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
    const frequency = props.viewData.frequency;
    const days = props.viewData.days;
    const getToday = () => {
        const now = new Date();
        const today = now.getDay();
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return days[today];
    };
    const startTime = props.viewData.startTime;
    const targetTime = props.viewData.targetTime;
    const [timer, setTimer] = useState(0);

    const getTimeFromToday = (dt: Date) => {
        const now = new Date();
        now.setHours(
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
            dt.getMilliseconds()
        );
        return now;
    };
    const changeTimer = (now: Date, start: Date, target: Date) => {
        const timeLeft = target.getTime() - now.getTime();
        if (now.getTime() < start.getTime()) {
            // Don't start until startTime has passed
            setTimer(target.getTime() - start.getTime());
        } else if (timeLeft <= 0) {
            // If the countdown is over, clear the interval
            setTimer(0);
        } else {
            setTimer(timeLeft);
        }
    };

    useEffect(() => {
        const startWeeklyTimer = () => {
            if (days.includes(getToday())) {
                const now = new Date();
                const start = getTimeFromToday(new Date(startTime));
                const target = getTimeFromToday(new Date(targetTime));
                changeTimer(now, start, target);
            } else {
                setTimer(0);
            }
        };

        // Update the countdown every second
        const intervalId = setInterval(() => {
            // If a weekly countdown is desired
            if (frequency === 'weekly') {
                // If today is included in the specified days
                startWeeklyTimer();
            }
        }, 1000); // Update every second

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, [frequency, days, targetTime, startTime]);

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
