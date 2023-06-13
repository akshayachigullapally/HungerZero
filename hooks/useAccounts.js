import {account} from "./useAppwrite"
import { ID } from "appwrite"

const registerUser = async (name, email, password, userType) => {
    try {
        const response = await account.create(
            ID.unique(),email, password, name, {
                userType: userType
            }
        )
        // console.log(response)
        return false
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