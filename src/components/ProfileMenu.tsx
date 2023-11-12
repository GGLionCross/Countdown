import { Menu, MenuItem } from '@mui/material';
import { handleSignOut } from '../services/auth';

interface ProfileMenuProps {
    anchor: HTMLElement | null;
    open: boolean;
    close: () => void;
}

export default function ProfileMenu(props: ProfileMenuProps) {
    return (
        <Menu
            anchorEl={props.anchor}
            id='profile-menu'
            open={props.open}
            onClick={props.close}
            onClose={props.close}
        >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );
}