import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Button, Typography, Portal, Backdrop, CircularProgress, Link } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import { useContext } from 'react'
import useDatabase from '../../../hooks/useDatabase'
import { toast } from 'react-toastify'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function ManageRequests() {
    const database = useDatabase()
    const {user, isLoggedIn} = useContext(GlobalContext)
    const [requests, setRequests] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if(isLoggedIn){
            database.requestsForMe().then((res) => {
              console.log(res)
              setRequests(res)
          }).catch((e) => console.log(e))
        }
    }, [isLoggedIn])

    const handleAction = (action, requestId, requestedBy) => {
        setIsSubmitting(true)
        database.pickupAction(action, requestId, requestedBy).then((res) => {
            console.log(res)
            if(res){
                console.log(requests)
                const newRequests = requests.map((r) => {
                    if(r.requestId === requestId){
                        return {
                            ...r,
                            status: action
                        }
                    }else{
                        return {
                            ...r
                        }
                    }
                })
                console.log(newRequests)
                setRequests(newRequests)
                
                toast.success(`You ${action} Food Id - ${requestId}`, {
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
            setIsSubmitting(false)
        }).catch((e) => {
            console.log(e)
            setIsSubmitting(false)
        })
    }

  return (
    <>
      <Box
          sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
          {
            requests?.length > 0 && 

            <ThemeProvider alignItems="center" theme={darkTheme}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Listing Id</TableCell>
                      <TableCell align="right">Food Name</TableCell>
                      <TableCell align="right">Requested By&nbsp(g)</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests?.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row?.listingId}
                        </TableCell>
                        <TableCell align="right">{row?.foodName}</TableCell>
                        <TableCell align="right">{row?.requestedBy}</TableCell>
                        <TableCell align="right">{row?.quantity}</TableCell>
                        <TableCell align="right">{row?.status}</TableCell>
                        <TableCell align="right">
                        <Box>
                            <Button onClick={() => handleAction("approved", row?.requestId, row?.requestedBy)}>Approve</Button>
                            <Button onClick={() => handleAction("rejected", row?.requestId, row?.requestedBy)}>Reject</Button>
                            <Button onClick={() => handleAction("delivered", row?.requestId, row?.requestedBy)}>Deliver</Button>
                        </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ThemeProvider>
          }
          {!isLoggedIn && (
            <Box alignItems="center">
              <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                You are not logged in
              </Typography>
            </Box>
          )}
          {isLoggedIn && requests?.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                No Donations Yet
              </Typography>
              <Button variant="gradient" component={Link} href="/dashboard/donate">
                Click to Donate{' '}
              </Button>
            </Box>
          )}
          <Portal>
            <Backdrop
              sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
              open={isSubmitting}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Portal>
      </Box>
    </>
  )
}
