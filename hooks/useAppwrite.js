import { Client, Account, Databases, Storage, Functions } from "appwrite"
// import dotenv from 'dotenv'
// dotenv.config()

const client = new Client()

const account = new Account(client)
const database = new Databases(client)
const storage = new Storage(client)
const functions = new Functions(client)

// console.log(process.env.NEXT_PUBLIC_BUCKET_ID, "nisant  process")

client.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)

export {
    account,
    database,
    storage,
    functions
}