import React, { useContext, useState } from 'react'
import { TextField, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Link from 'next/link'
import {registerUser, getAccount} from '../../hooks/useAccounts'
import { GlobalContext } from '../../utils/GlobalContextProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Register = () => {
  const [userType, setUserType] = useState('user')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const {setIsLoggedIn, setUser} = useContext(GlobalContext)
  const router = useRouter()

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const navigateToDash = () => {
    router.push('/dashboard/all-foods')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Perform registration logic here
    console.log(userType, name, email, password)
    const register = await registerUser(name, email, password, userType)
    console.log(register)

    if(register){
        setError(true)
        toast.error("Couldn't Registered", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
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
        toast.success("Registered Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        navigateToDash()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField label="Name" fullWidth value={name} onChange={handleNameChange} sx={{ marginBottom: 2 }} />
        <TextField label="Email" fullWidth value={email} onChange={handleEmailChange} sx={{ marginBottom: 2 }} />
        <TextField label="Password" type="password" fullWidth value={password} onChange={handlePasswordChange} sx={{ marginBottom: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Register
        </Button>
        <div style={{ marginTop: '1rem', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="body2">
            You are already registered. Please{' '}
            <Link href="/auth/login" passHref underline="always">
              login here
            </Link>
            .
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default Register
