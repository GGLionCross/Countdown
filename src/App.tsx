// React Imports
import { useState } from 'react'

// Component Imports
import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'

// Local Imports
import './App.css'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const gLoginSuccess = (response: CredentialResponse) => {
    console.log(response);
  }
  const gLoginError = () => {
      console.log('An error occurred.');
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <GoogleLogin onSuccess={gLoginSuccess} onError={gLoginError} />
    </>
  )
}

export default App
