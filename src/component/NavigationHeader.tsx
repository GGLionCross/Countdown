// Components
import { AppBar, Box, Divider } from '@mui/material';
import UserAvatar from './UserAvatar';

export default function NavigationHeader() {
    // AppBar position fixed means it will stay at the top regardless of scroll
    return (
        <AppBar position='fixed'>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box></Box>
                <Box display="flex" alignItems="center" gap={1} sx={{ p: 1 }}>
                    <Divider orientation="vertical" sx={{ py: 3 }} />
                    <UserAvatar />
                </Box>
            </Box>
        </AppBar>
    );
}