import ListingCard, {ListingDetail} from "./ListingCard"
import CardGrid from "../layouts/CardGrid"
import { Box, Button, Typography, Alert } from "@mui/material"
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { useState } from "react"
import { PreviewImage } from "./PreviewImage"
import Link from "next/link"

export default function MyFoods({isLoading, isLoggedIn, listing}){
    const [alertMsg, setAlert] = useState(null)
    const [successMsg, setSuccess] = useState(null)

    return(
        <CardGrid>
            {!isLoading && listing?.map((food) => (
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

            {!isLoading && isLoggedIn && listing?.length === 0 && (
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
    )
}