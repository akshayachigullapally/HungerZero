import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Button, Typography, Portal, Backdrop, CircularProgress, Link, collapseClasses } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import { useContext } from 'react'
import useDatabase from '../../../hooks/useDatabase'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function ManageRequests() {
    const database = useDatabase()
    const {isLoggedIn} = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if(isLoggedIn){
            database.requestsForMe().then((res) => {
              setRequests(res)
              setIsLoading(false)
          }).catch((e) => {
              setIsLoading(false)
              console.log(e)
          })
        }
        else{
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

    const styles = {
      list: {
        backgroundColor: "#ffffff",
        margin: '0',
        alignItems: 'center',
        width: '100%',
        borderRadius: '2rem',
        marginTop: '.5rem',
        "&:hover": {
          backgroundColor: "#f1f1f1",
          cursor: 'pointer',
          boxShadow: '5px 5px 5px #aaaaaa'
        },
      },
  
      listCol: {
        width: '100%',
      }
    }

  return (
    <>
      <Box sx={{
        display: requests.length === 0 ? 'flex': 'initial',
        padding: '1rem',
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          {isLoading && isLoggedIn && <CircularProgress />}

          {!isLoggedIn && (
            <Box alignItems="center">
              <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                You are not logged in
              </Typography>
            </Box>
          )}

          {
            requests?.length > 0 &&

            <div>
              <div>
                <Grid container spacing={2}>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={2.5}>
                    <h4>Listing Id</h4>
                  </Grid>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={1.5}>
                    <h4>Food Name</h4>
                  </Grid>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={3}>
                    <h4>Requested By</h4>
                  </Grid>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={1}>
                    <h4>Quantity</h4>
                  </Grid>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={1}>
                    <h4>Status</h4>
                  </Grid>
                  <Grid item textAlign="center" sx={{color: 'black'}} xs={3}>
                    <h4>Actions</h4>
                  </Grid>
                </Grid>
              </div>

              {
                requests?.map((r, i) => (
                  <Grid key={i} container spacing={2}
                    className='list' padding={1} sx={styles.list}
                  >
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={2.5}>
                      {r?.listingId}
                    </Grid>
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={1.5}>
                      {r?.foodName}
                    </Grid>
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={3}>
                      {r?.requestedBy}
                    </Grid>
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={1}>
                      {r?.quantity}
                    </Grid>
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={1}>
                      {r?.status}
                    </Grid>
                    <Grid className='listCol' sx={styles.listCol} textAlign="center" xs={3}>
                      <Button onClick={() => handleAction("approved", r?.requestId, r?.requestedBy)}>
                        <DoneIcon fontSize='small' />
                      </Button>
                      <Button onClick={() => handleAction("rejected", r?.requestId, r?.requestedBy)}>
                        <ClearIcon fontSize='small' />
                      </Button>
                      <Button onClick={() => handleAction("delivered", r?.requestId, r?.requestedBy)}>
                        <LocalShippingIcon fontSize='small' />
                      </Button>
                    </Grid>
                  </Grid>
                ))
              }
            </div>
          }

          {
            !isLoading && requests?.length === 0 &&

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
                No Requests Yet
              </Typography>
            </Box>
          }

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
