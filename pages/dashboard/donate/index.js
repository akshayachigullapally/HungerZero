import {CreateListingForm} from '../../../components/CreateListingForm'
import { Container, Box, Typography } from '@mui/material'
import {getAccount} from '../../../hooks/useAccounts'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function CreateListingPage() {

  const {isLoggedIn} = useContext(GlobalContext)

  useEffect(() => {
    if(!isLoggedIn){
      toast.error("You need to login First", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [isLoggedIn])

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        {
          !isLoggedIn 
        
          ?

          (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                pb: 4,
              }}
            >
              <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                You are not logged in
              </Typography>
            </Box>
          )

          :

          <CreateListingForm />
        }
      </Container>
    </Box>
  )
}