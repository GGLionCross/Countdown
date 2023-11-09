import Avatar from '@mui/material/Avatar';
import { useAuth } from '../services/auth';

export default function UserAvatar() {
    const { user } = useAuth();
    return <Avatar src={user?.photoURL || ''} />;
}