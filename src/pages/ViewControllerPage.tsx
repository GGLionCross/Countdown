// Component ImportsGoogleL
import NavigationHeader from '../component/NavigationHeader';
import SignInCard from '../component/SignInCard'

export default function ViewControllerPage() {
    return (
        <>
            <NavigationHeader />
            <SignInCard />
            <div>User is logged in</div>
        </>
    )
}