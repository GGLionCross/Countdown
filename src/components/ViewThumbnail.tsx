// React
import { MouseEventHandler } from 'react';

// Components
import { Grid, Card, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; // Import the add icon

interface ViewThumbnailProps {
    addView?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ViewThumbnail(props: ViewThumbnailProps) {
    const cardStyle = {
        position: 'relative',
        width: '100%', // Full width of the parent
        paddingTop: '56.25%', // Aspect ratio padding top
    };
    const buttonStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%', // Full width of the wrapper
        height: '100%', // Full height of the wrapper
        border: 'none', // Remove border if not needed
        overflow: 'hidden', // Prevent content from overflowing
    };
    const addIconStyle = {
        color: 'white',
        fontSize: '2rem'
    }
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardStyle}>
                <Button sx={buttonStyle} onClick={props.onClick}>
                    {props.addView && <AddIcon sx={addIconStyle} />}
                </Button>
            </Card>
        </Grid>
    )
}