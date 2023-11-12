// User Authentication
import { useAuth } from '../services/auth';

// Pages
import NavigationHeader from '../components/NavigationHeader';
import SignInPage from '../pages/SignInPage';
import ViewControllerPage from '../pages/ViewControllerPage';

export default function Root() {
    const { user } = useAuth();
    if (user) {
        return (
            <>
                <NavigationHeader title='Views' />
                <ViewControllerPage/>
            </>
        );
    } else {
        return <SignInPage />;
    }
}