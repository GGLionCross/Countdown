// Assets
import logo from '~/assets/LionCrossMane.svg';

// Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SignInForm from './SignInForm';

// This function is responsible for structuring the SignIn components.
export default function SignInCard() {
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
                    <Divider variant='middle' />
                    <SignInForm />
                </Stack>
            </CardContent>
        </Card>
    );
}
