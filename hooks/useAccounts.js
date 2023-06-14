import {account} from "./useAppwrite"
import { ID } from "appwrite"
import useFunctions from "./useFunctions"

const registerUser = async (name, email, password, userType) => {
    const functions = useFunctions()
    try {
        const response = await account.create(
            ID.unique(),email, password, name, {
                userType: userType
            }
        )
        console.log(response)

        const data = {
            mailTo : email,
            name: name
        }

        console.log(data)
        if(response.status){
            const emailRes = await functions.emailRegistration(data)
            console.log(emailRes)

            if(emailRes){
                const session = await account.createEmailSession(email, password)
                console.log(session)
                return false
            }else{
                return true
            }
        }else{
            return true
        }
    } catch (error) {
        console.error(error)
        return true
    }
}

const loginUser = async (email, password) => {
    //creating email session
    try {
        const response = await account.createEmailSession(email, password)
        // console.log(response)
        return false
    } catch (error) {
        console.error(error)
        return true
    }
}

const getSession = async () => {
    try {
        const response = await account.getSession('current')
        // console.log(response)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getAccount = async () => {
    try {
        const response = await account.get()
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}

const deleteSession = async () => {
    try {
        const response = await account.deleteSession('current')
        // console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}

export {
    registerUser,
    loginUser,
    getSession,
    deleteSession,
    getAccount
}