import { functions } from "./useAppwrite"

const useFunctions = () => {
    const sendPickupUpdate = async (data) => {
        console.log(data)
        try {
            console.log(JSON.stringify({
                "mailTo" : data.email,
                "status": data.status,
                "pickupId": data.pickupId
                }))

            const res = await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_ID_PICKUP_UPDATE, 
                JSON.stringify({
                    "mailTo" : data.email,
                    "status": data.status,
                    "pickupId": data.pickupId
                    })
            )
            console.log(res)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const emailRegistration = async (data) => {
        
        try {
            const res = await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_ID_REGISTRATION_EMAIL, 
                JSON.stringify({
                    "mailTo" : data.mailTo,
                    "name": data.name
                })
            )
            console.log(res)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return {
        sendPickupUpdate,
        emailRegistration
    }
}

export default useFunctions