import { Client, Account } from "appwrite"

const client = new Client()

const account = new Account(client)

client.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6485a6a75d75a2495193')

export default account