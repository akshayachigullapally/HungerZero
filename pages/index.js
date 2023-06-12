import Head from 'next/head'
import {Button, Box, Typography, Link as MuiLink, Divider} from '@mui/material'
import {Launch as ExternalIcon} from '@mui/icons-material'
import Link from 'next/link'
// import {learnMoreLink} from '../constants'
import {GlobalContextProvider} from '../utils/GlobalContextProvider'

export default function Home() {

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      textAlign="center"
    >
      <div>
        <Head>
          <meta
            name="description"
            content="Remove Hunger from the society"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Typography
          sx={{
            justifyContent: 'center',
            fontSize: 50,
            textTransform: 'uppercase',
            letterSpacing: 6,
            fontWeight: 'bold',
            mb: 1,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <img src="../assets/images/logo.png" alt="HungerZero Logo" height={60} width={60} />
          <b>HungerZero</b>
        </Typography>

        <Typography variant="h6">
          Remove Hunger from the society
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
          }}
        >
          <Button
            variant="gradient-solid"
            component={Link}
            href="/participate"
            size="large"
            sx={{width: 200, height: 50, fontSize: 18}}
          >
            Participate
          </Button>
          <br />
          <Button
            variant="gradient"
            component={Link}
            href="create"
            sx={{width: 200, height: 50, fontSize: 18}}
          >
            Donate Food
          </Button>
        </Box>
        <Divider sx={{my: 2}} />
        <Box sx={{textAlign: 'left', mb: 2}}>
          <div>
            <Typography variant="h6">
              <b>More</b>
            </Typography>
            To donate your food, you can use{' '}
            <MuiLink
              color="info.main"
              target="_blank"
              href="/"
              underline="hover"
            >
              Guidelines
            </MuiLink>
            .
          </div>
        </Box>
        <Divider sx={{my: 2}} />
        <MuiLink
          underline="hover"
          variant="h6"
          // href={learnMoreLink}
          target="_blank"
          sx={{
            color: 'info.main',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          Learn more about HungerZero
          <ExternalIcon fontSize="inherit" />
        </MuiLink>
      </div>
    </Box>
  )
}
