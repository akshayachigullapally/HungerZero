import {database} from './useAppwrite'
import { ID } from 'appwrite'
import useStorage from './useStorage'

const useDatabase = () => {
    const storage = useStorage()

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

    const getAllListings = async() => {
        try {
            const listings = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_ID)
            console.log(listings)
            return listings
        } catch (error) {
            console.log(error)
            return "Can't Fetch"
        }
    }

    return {
        createFoodListing,
        getAllListings
    }
}

export default useDatabase