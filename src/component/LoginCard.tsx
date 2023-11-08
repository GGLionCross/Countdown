// Assets
import logo from '../assets/react.svg';

// Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Login from './Login';

// This function is responsible for structuring the Login components.
function LoginCard() {
    return (
        <Card>
            <CardContent>
                <Stack direction='column' spacing={2}>
                    <CardMedia
                        component='img'
                        image={logo}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '20vh', // Set a fixed height or use maxHeight for dynamic sizing
                            objectFit: 'contain', // Prevents the logo from being cropped
                        }}
                    />
                    <Divider variant="middle" />
                    <Login />
                </Stack>
            </CardContent>
        </Card>
    )
}

export default LoginCard;