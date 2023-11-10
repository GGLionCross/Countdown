// Components
import { Container } from '@mui/material'
import SignInCard from '../component/SignInCard'

export default function SignInPage() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <SignInCard />
        </Container>
    )
}