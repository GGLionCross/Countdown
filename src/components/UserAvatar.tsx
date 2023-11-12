// React
import { useState, MouseEvent } from 'react';

// Firebase
import { useAuth } from '../services/auth';

// Components
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import ProfileMenu from './ProfileMenu';

export default function UserAvatar() {
    const { user } = useAuth();
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const openState = Boolean(anchor);

    const openProfileMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    }
    const closeProfileMenu = () => {
        setAnchor(null);
    }

    return (
        <>
            <Button onClick={openProfileMenu}>
                <Avatar src={user?.photoURL || ''} />
            </Button>
            <ProfileMenu
                anchor={anchor}
                open={openState}
                close={closeProfileMenu}
            />
        </>
    );
}