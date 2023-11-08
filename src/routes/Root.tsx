// User Authentication
import { useAuth } from '../services/auth';

// Pages
import LoginPage from '../pages/LoginPage';
import ViewControllerPage from '../pages/ViewControllerPage';

export default function Root() {
    const { user } = useAuth();
    if (user) {
        return <ViewControllerPage/>;
    } else {
        return <LoginPage />;
    }
}