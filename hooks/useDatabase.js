import {database} from './useAppwrite'
import { ID, Query } from 'appwrite'
import useStorage from './useStorage'
import { GlobalContext } from '../utils/GlobalContextProvider'
import { useContext } from 'react'

const useDatabase = () => {
    const storage = useStorage()
    const {user} = useContext(GlobalContext)


    const createFoodListing = async(data) => {
        try {
            const imgUrl = await storage.storeImage(data.img)
            console.log(imgUrl)
            // https://cloud.appwrite.io/v1/storage/buckets/6487bcb23c2603bca6ba/files/6487d6611b9da08eee84/view?project=6487b639dc62b5a8f386
            const url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${imgUrl.url.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
            // console.log(url)

            if(imgUrl.status){
                const listing = await database.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID,
                    ID.unique(),
                    {
                        ...data,
                        img: url
                    }
                )
                return true
            }else{
                console.log("Image not Uploaded")
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const getAllListings = async(userId) => {
        try {
            const listings = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID)
            console.log(listings)
            return listings
        } catch (error) {
            console.log(error)
            return "Can't Fetch"
        }
    }

    const getMyListings = async () => {
        try {
            console.log(user.userId)
            const listings = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID,
                                [Query.equal("providerId", [user.userId])]
                            )
            console.log(listings)
            return listings
        } catch (error) {
            console.log(error)
            return "Can't Fetch"
        }
    }

    const submitPickupRequest = async (data) => {
        try {
            // console.log(data)
            const document = await database.getDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_COLLECTION_ID,
                data.foodId
            )

            const updatedQuantity = document.quantity - data.chosenQuantity

            const updateListing = await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID, data.foodId, {
                quantity: updatedQuantity
            })
            console.log(updateListing)

            const pickup = await database.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID_PICKUP,
                ID.unique(),
                {
                    ...data
                }
            )
            console.log(pickup)
            return {
                status: true,
                data: updateListing
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const getMyRequestedFoods = async () => {
        try {
            const listings = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID,
                [Query.equal("providerId", [user.userId])]
            )

            const OrderedListings = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID_PICKUP,
                                [Query.equal("providerId", [user.userId])]
                           )
            console.log(listings, OrderedListings)
            const ordered = []
            const x = OrderedListings.documents.map((res) => {
                for(let i = 0; i < listings.documents.length; i++){
                    if(res.foodId === listings.documents[i].$id){
                        ordered.push({
                            ...listings.documents[i],
                            quantity: res.chosenQuantity
                        })
                    }
                    console.log("Nishant")
                }
            })
            console.log(ordered)
            return ordered
        } catch (error) {
            console.log(error)
            return "Can't Fetch"
        }
    }

    return {
        createFoodListing,
        getAllListings,
        getMyListings,
        submitPickupRequest,
        getMyRequestedFoods
    }
}

export default useDatabase