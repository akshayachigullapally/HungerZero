import React, { useState } from 'react'
import { TextField, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Link from 'next/link'
import {loginUser} from '../../hooks/useAccounts'

const Dashboard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Perform registration logic here
    console.log(email, password)
    const login = await loginUser(email, password)
    console.log(login)
    if(login){
        setError(true)
    }else{
        setError(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
    </div>
  )
}

export default Dashboard
