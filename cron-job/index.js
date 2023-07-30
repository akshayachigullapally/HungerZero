const express = require('express')
var cron = require('node-cron');
const sdk = require("node-appwrite")
const { Query } = require('node-appwrite')

require('dotenv').config()

const app = express()

const client = new sdk.Client();

const database = new sdk.Databases(client);

client
    .setEndpoint(process.env.FUNCTION_ENDPOINT)
    .setProject(process.env.PROJECT_ID)

app.all('/', (req, res) => {

    cron.schedule('*/1 * * * *', async () => {
        console.log('running cron job nishant')

        const today = new Date().toJSON().slice(0, 10)

        let listings = await database.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID,
            [
                Query.equal('isExpired', [false])
            ]
        )

        var updatedListings = []

        for (const item of listings.documents) {
            if(item.expiryDate < today){
                try {
                    await database.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID, item.$id, {
                        isExpired: true
                    })

                    updatedListings.push(item)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        console.log(updatedListings)
    })

})

app.listen(3000)