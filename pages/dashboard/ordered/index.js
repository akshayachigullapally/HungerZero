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

export default function Ordered() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMsg, setAlert] = useState(null)
  const [successMsg, setSuccess] = useState(null)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { isLoggedIn } = useContext(GlobalContext)
  const database = useDatabase()

  useEffect(() => {
    database.getMyRequestedFoods().then((res) => {
      console.log(res)
      setListings(res.filter((r) => r.status !== "delivered"))
      // setListings(res)
      setIsLoading(false)
    }).catch((e) => {
      console.log(e)
      setIsLoading(false)
    })
  }, [])

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
                  label="Ordered Quantity"
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
                <Tooltip title='For the sake of the demonstration, even zero rewards can be "withdrawn"'>
                  <Button variant="gradient" onClick={() => console.log("to be implemented")}>
                    <Box mr={1} mt={1}>
                      <InfoIcon fontSize="small" />
                    </Box>
                    {food.dietaryInfo}
                  </Button>
                </Tooltip>
              </Box>
              <Box>
                <Alert severity={food.status === 'pending' ? 'info' : food.status === 'rejected' ? 'error' : 'success'} sx={{my: 1, justifyContent: 'center'}}>
                  {food.status}
                </Alert>
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
      {isLoggedIn && listings?.length === 0 && (
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
            No foods found
          </Typography>
          <Button variant="gradient" component={Link} href="/create">
            Create food{' '}
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
