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
  TextField
} from '@mui/material'
import ListingCard, {ListingDetail} from '../../../components/ListingCard'
import CardGrid from '../../../layouts/CardGrid'
import {useEffect, useState} from 'react'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import useDatabase from '../../../hooks/useDatabase'
import { client } from '../../../hooks/useAppwrite'
import { useContext } from 'react'
import { PreviewImage } from '../../../components/PreviewImage'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function getAllListings() {
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const database = useDatabase()
  const { isLoggedIn } = useContext(GlobalContext)

  useEffect(() => {
    database.getAllListings().then((res) => {
      console.log(res)
      setListings(res.documents)
      setIsLoading(false)
    }).catch((e) => console.log(e))
  }, [])

  return (
    <>
      {listings?.length === 0 && isLoggedIn && <CircularProgress />}
      {
        listings && 
        <CardGrid>
          {listings?.map((data) => (
            <RequestCard
              food={data}
              key={data.id}
              // disabled={!canJoin(ispo.epochEnd)}
            />
          ))}
          {listings?.length === 0 && (
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
              No offerings found
            </Typography>
          )}
        </CardGrid>
      }
    </>
  )
}

function RequestCard({food, disabled = false}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMsg, setAlert] = useState(null)
  const [successMsg, setSuccess] = useState(null)
  const [quantity, setQuantity] = useState(food.quantity)

  const database = useDatabase()
  
  const [form, setForm] = useState({})

  const { isLoggedIn, user } = useContext(GlobalContext)
  const router = useRouter()

  const handlePickupRequest = async() => {
    const pickup = {
      foodId: food.$id,
      requestedBy: user.email,
      chosenQuantity: form.chosenQuantity,
      status: "pending"
    }
    console.log(pickup)

    const res = await database.submitPickupRequest({
      ...pickup
    })

    console.log(res)

    if(res?.status){
      setSuccess("Successfully Sent Request")
      setQuantity(res?.data.quantity)

      toast.success(`Request for Food submitted successfully`, {
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

    if(!res){
      setAlert("Couldn't make request")
      console.log(res?.data)
      food = res?.data

      toast.error(`Error while requesting for food`, {
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

    console.log(res)
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  

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
      router.push("/")
    }
  }, [])

  return (
    <CardGrid>
      <ListingCard
          sx={{opacity: !disabled ? 1 : 0.6}}
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
                  value={food?.foodName}
                />
                <ListingDetail
                  label="Quantity"
                  value={quantity}
                />
                <ListingDetail
                  highlight
                  label="Location"
                  value={food?.location}
                />
                <ListingDetail
                  highlight
                  label="Quality"
                  value={food?.quality}
                />
              </Box>
              <Box>
                <PreviewImage url={food?.img} />
              </Box>
            </>
          }
          footerContent={
            <div>
              <Box
                sx={{
                  display: 'flex',
                  mb: '.1rem',
                  gap: 1,
                  '& > *': {width: '100%', mt: 1},
                }}
              >
                <Button variant="gradient" onClick={() => console.log("to be implemented")}>
                  <Box mr={1}>
                    <InfoIcon fontSize="small" />
                  </Box>
                  {food?.dietaryInfo}
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
              <Box
                component="form"
                display="flex"
                gap={1}
                justifyContent="space-between"
                alignItems="flex-end"
                mb={1}
              >
                <TextField
                  variant="standard"
                  name="chosenQuantity"
                  type="number"
                  label="Quantity Required"
                  value={form.chosenQuantity || ""}
                  onChange={handleChange}
                />
                <Button
                  variant="gradient"
                  onClick={handlePickupRequest}
                  sx={{width: 'fit-content'}}
                >
                  Request
                </Button>
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
      {!isLoggedIn && (
        <Box>
          <Typography variant="h5" sx={{fontWeight: 'bold'}}>
            You are not logged in
          </Typography>
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
