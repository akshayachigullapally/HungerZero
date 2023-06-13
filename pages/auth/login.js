import React, { useContext, useState } from 'react'
import { TextField, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Link from 'next/link'
import {loginUser, getAccount} from '../../hooks/useAccounts'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../utils/GlobalContextProvider'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()
  const {setUser, setIsLoggedIn} =  useContext(GlobalContext)

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const navigateToDash = () => {
    router.push('/dashboard')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(email, password)

    console.log(process.env.PROJECT_ID)
    const login = await loginUser(email, password)
    console.log(login)

    if(login){
        setError(true)
    }else{
        setError(false)
        setIsLoggedIn(true)
        const info = await getAccount()
        setUser({
            name: info.name,
            email: info.email,
            userId: info.$id
            // userType: login.userType
        })
        navigateToDash()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Log-In
      </Typography>
      {
        error && (
            <div style={{ marginTop: '1rem', marginBottom: '16px', textAlign: 'center' }}>
                <Typography variant="body2">
                    In-valid credentials. Please{' '} try again
                </Typography>
            </div>
        )
      }
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField label="Email" fullWidth value={email} onChange={handleEmailChange} sx={{ marginBottom: 2 }} />
        <TextField label="Password" type="password" fullWidth value={password} onChange={handlePasswordChange} sx={{ marginBottom: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Log-In
        </Button>
        <div style={{ marginTop: '1rem', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="body2">
            You are not registered. Please{' '}
            <Link href="/auth/register" passHref underline="always">
              Register here
            </Link>
            .
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default Login
