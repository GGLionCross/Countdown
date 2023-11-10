// Components
import { AppBar, Box, Divider, Typography } from '@mui/material';
import UserAvatar from './UserAvatar';

interface NavigationHeaderProps {
    title: string
}

export default function NavigationHeader(props: NavigationHeaderProps) {
    return (
        <AppBar
            position='fixed' /* Stay on top regardless of scroll position */
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box sx={{ pl: 2 }}>
                    <Typography variant='h5' component='h1'>
                        {props.title}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} sx={{ p: 1 }}>
                    <Divider orientation="vertical" sx={{ py: 3 }} />
                    <UserAvatar />
                </Box>
            </Box>
        </AppBar>
    );
}