// User Authentication
import { useAuth } from '../services/auth';

// Pages
import SignInPage from '../pages/SignInPage';
import ViewControllerPage from '../pages/ViewControllerPage';

export default function Root() {
    const { user } = useAuth();
    if (user) {
        return <ViewControllerPage/>;
    } else {
        return <SignInPage />;
    }
}