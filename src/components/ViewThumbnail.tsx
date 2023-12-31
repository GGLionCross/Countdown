// React
import { MouseEventHandler } from 'react';

import { SxProps, Theme } from '@mui/material/styles';
// Components
import { Box, Button, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the add icon

// Services
import { ViewSchema } from '~/services/database';

interface ViewThumbnailProps {
    viewId?: string;
    viewData?: ViewSchema<string, string>;
    addView?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ViewThumbnail(props: ViewThumbnailProps) {
    const viewHeight = 32; // Preview Height as a % of vh
    const viewWidth = (viewHeight * 16) / 9; // Preview Width as a % of vh, keeping 16:9 ratio
    const cardStyle = {
        position: 'relative',
        height: `${viewHeight}vh`,
        width: `${viewWidth}vh`, // Full width of the parent
        backgroundImage: `url(${props.viewData?.background})`,
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        backgroundSize: 'cover', // Cover the entire area of the element
    };
    const viewStyle = props.viewData
        ? {
              fontFamily: props.viewData.fontFamily, // TypeScript should infer this is string
              color: props.viewData.fontColor, // TypeScript should infer this is string
              fontSize: `${(props.viewData?.fontSize * viewHeight) / 100}vh`,
              fontWeight: props.viewData.fontFormats.includes('bold')
                  ? 700
                  : 400,
          }
        : {};
    const buttonStyle = {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%', // Full width of the wrapper
        height: '100%', // Full height of the wrapper
        border: 'none', // Remove border if not needed
        overflow: 'hidden', // Prevent content from overflowing
        fontSize: '2rem',
        ...viewStyle,
    };
    const addIconStyle = {
        color: 'white',
        fontSize: '2rem',
    };
    return (
        <Card sx={cardStyle}>
            <Button sx={buttonStyle as SxProps<Theme>} onClick={props.onClick}>
                {props.addView ? <AddIcon sx={addIconStyle} /> : '12:34'}
            </Button>
            {props.viewData && (
                <Box
                    position='absolute'
                    sx={{
                        zIndex: 1,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        opacity: props.viewData.overlayOpacity,
                    }}
                ></Box>
            )}
        </Card>
    );
}
