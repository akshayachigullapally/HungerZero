import {CreateListingForm} from '../../../components/CreateListingForm'
import { Container, Box, Typography } from '@mui/material'
import {getAccount} from '../../../hooks/useAccounts'

export default function CreateListingPage() {

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