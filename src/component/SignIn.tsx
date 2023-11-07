// Component Imports
import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'

function SignIn() {
  const googleSuccess = (response: CredentialResponse) => {
    console.log(response)
  }
  const googleError = () => {
    console.log('An error occurred.')
  }

  return (
    <div>
      <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
    </div>
  )
}

export default SignIn