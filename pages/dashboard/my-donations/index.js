import Link from 'next/link'
import {
  Box,
  Button,
  Tooltip,
  Typography,
  CircularProgress,
  Portal,
  Backdrop,
  Alert,
} from '@mui/material'
import ListingCard, {ListingDetail} from '../../../components/ListingCard'
import CardGrid from '../../../layouts/CardGrid'
import {useEffect, useState} from 'react'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import useDatabase from '../../../hooks/useDatabase'
import { useContext } from 'react'
import { PreviewImage } from '../../../components/PreviewImage'
import { toast } from 'react-toastify'

export default function AllListings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMsg, setAlert] = useState(null)
  const [successMsg, setSuccess] = useState(null)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { isLoggedIn } = useContext(GlobalContext)
  const database = useDatabase()

  useEffect(() => {
    if(isLoggedIn){
      database.getMyListings().then((res) => {
        console.log(res)
        setListings(res.documents)
        setIsLoading(false)
      }).catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
    }else{
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
    <CardGrid>
      {isLoading && isLoggedIn && <CircularProgress />}
      {!isLoading && listings?.map((food) => (
        <ListingCard
          {...food}
          body={
            <>
              <Box
                display="flex"
                justifyContent="space-around"
                flexWrap="wrap"
                alignItems="center"
                gap={1}
              >
                <ListingDetail
                  label="Food"
                  value={food.foodName}
                />
                <ListingDetail
                  label="Quantity"
                  value={food.quantity}
                />
                <ListingDetail
                  highlight
                  label="Location"
                  value={food.location}
                />
                <ListingDetail
                  highlight
                  label="Quality"
                  value={food.quality}
                />
              </Box>
              <Box>
                <PreviewImage url={food.img} />
              </Box>
            </>
          }
          key={food.id}
          footerContent={
            <div>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  '& > *': {width: '100%', mt: 1},
                  mb: 1,
                }}
              >
                <Button variant="gradient" onClick={() => console.log("to be implemented")}>
                    <Box mr={1} mt={1}>
                      <InfoIcon fontSize="small" />
                    </Box>
                    {food.dietaryInfo}
                  </Button>
              </Box>
              <Box
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'row',
                  mb: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: '.5rem'
                }}
              >
                <Typography variant="string" sx={{mr: '1rem'}}>Expiry Date: </Typography>
                <Typography variant="string" fontWeight="bold">
                  {food?.expiryDate}{' '}
                </Typography>
              </Box>
              {successMsg && (
                <Alert severity="success" onClose={() => setSuccess(null)}>
                  {successMsg}
                </Alert>
              )}
              {alertMsg && (
                <Alert severity="error" onClose={() => setAlert(null)}>
                  {alertMsg}
                </Alert>
              )}
            </div>
          }
        />
      ))}
      {!isLoggedIn && (
        <Box>
          <Typography variant="h5" sx={{fontWeight: 'bold'}}>
            You are not logged in
          </Typography>
        </Box>
      )}
      {!isLoading && isLoggedIn && listings?.length === 0 && (
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
    </CardGrid>
  )
}
