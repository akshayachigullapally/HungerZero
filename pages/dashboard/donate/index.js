import {CreateListingForm} from '../../../components/CreateListingForm'
import { Container, Box, Typography } from '@mui/material'
import {getAccount} from '../../../hooks/useAccounts'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import { useContext, useEffect } from 'react'

export default function CreateListingPage() {

  const {user} = useContext(GlobalContext)

  useEffect(() => {
    console.log(user)
  }, [])

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
        {false && (
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
        )}
        {true && <CreateListingForm />}
      </Container>
    </Box>
  )
}