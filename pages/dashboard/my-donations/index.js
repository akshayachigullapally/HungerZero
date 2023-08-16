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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PropTypes from 'prop-types'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  };
}

export default function AllListings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMsg, setAlert] = useState(null)
  const [successMsg, setSuccess] = useState(null)
  const [listings, setListings] = useState([])
  const [freshListings, setFreshListings] = useState([])
  const [expiredListings, setExpiredListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [value, setValue] = useState(0);

  const { isLoggedIn } = useContext(GlobalContext)
  const database = useDatabase()

  useEffect(() => {
    if(isLoggedIn){
      database.getMyListings().then((res) => {
        console.log(res)
        setListings(res.documents)
        setFreshListings(
          res.documents.filter((food) => food.isExpired === false)
        )
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

  const handleChange = (event, newValue) => {
    if(expiredListings.length === 0){
      console.log("settinig the expired food")
      setExpiredListings(
        listings.filter((food) => food.isExpired === true)
      )
    }

    if(freshListings.length === 0){
      console.log("setting the fresh food")
      setFreshListings(
        listings.filter((food) => food.isExpired === false)
      )
    }
    setValue(newValue)
  };

  return (
    <>
      {
        !isLoading && isLoggedIn && listings?.length > 0 && (
          <>
            <div style={{width: 'fit-content', margin: 'auto', textAlign: 'center', marginBottom: '1rem'}}>
              {
                !isLoading && 
                <>
                  <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                    <Tab label="Active"{...a11yProps(0)} />
                    <Tab label="Expired" {...a11yProps(1)} />
                  </Tabs>
                </>
              }
            </div>

            <div className='tab-items'>
              <TabPanel value={value} index={0}>
                <CardGrid>
                  {!isLoading && freshListings?.map((food) => (
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

                  {!isLoading && isLoggedIn && freshListings?.length === 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        No Fresh Donations Yet
                      </Typography>
                      <Button variant="gradient" component={Link} href="/dashboard/donate">
                        Click to Donate{' '}
                      </Button>
                    </Box>
                  )}
                </CardGrid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <CardGrid>
                  {!isLoading && expiredListings?.map((food) => (
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

                  {!isLoading && isLoggedIn && expiredListings?.length === 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        No Expired Donations
                      </Typography>
                    </Box>
                  )}
                </CardGrid>
              </TabPanel>
            </div>
          </>
        )
      }

      <CardGrid>
        {isLoading && isLoggedIn && <CircularProgress />}
        
        
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
    </>
  )
}
