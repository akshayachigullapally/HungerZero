import { storage } from "./useAppwrite"
import { ID } from "appwrite"

const useStorage = () => {
    const storeImage = async(file) => {
        try {
            // console.log(process.env.NEXT_PUBLIC_BUCKET_ID)
            const img = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID,
                ID.unique(),
                file
            )
            return {
                url: img,
                status: true
            }
        } catch (error) {
            console.log(error)
            return {
                status: false
            }
        }
    }

    return {
        storeImage
    }
}

export default useStorage