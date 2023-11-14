// Component Imports
import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

// Firebase Imports
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { handleAuthResponse } from '~/services/auth';

export default function SignInForm() {
    const handleSuccess = async (response: CredentialResponse) => {
        console.log(response);
        const credential = GoogleAuthProvider.credential(response.credential);
        signInWithCredential(auth, credential)
            .then(handleAuthResponse)
            .catch(error => {
                console.log('signInWithCredential > .catch(): ', error);
            });
    };

    const handleError = () => {
        console.error(
            'An error occurred while logging into Google. Please try again.'
        );

        alert('An error occurred while logging into Google. Please try again.');
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
