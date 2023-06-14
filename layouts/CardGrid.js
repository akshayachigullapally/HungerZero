import React from 'react'
import {Box} from '@mui/material'

const CardGrid = ({children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pb: 4,
          gap: '2rem'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default CardGrid
