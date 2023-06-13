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
import { useContext } from 'react'
import { PreviewImage } from '../../../components/PreviewImage'

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

  const { isLoggedIn } = useContext(GlobalContext)

  const handlePickupRequest = async() => {
    const pickup = {
      foodId: food.$id,
      providerId: food.providerId,
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
    }

    if(!res){
      setAlert("Couldn't make request")
      console.log(res?.data)
      food = res?.data
    }

    console.log(res)
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

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
                  gap: 1,
                  '& > *': {width: '100%', mt: 1},
                }}
              >
                <Tooltip title='For the sake of the demonstration, even zero rewards can be "withdrawn"'>
                  <Button variant="gradient" onClick={() => console.log("to be implemented")}>
                    <Box mr={1}>
                      <InfoIcon fontSize="small" />
                    </Box>
                    {food?.dietaryInfo}
                  </Button>
                </Tooltip>
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
