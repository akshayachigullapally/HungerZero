const sdk = require("node-appwrite")
const { Query } = require('node-appwrite')

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const storage = new sdk.Storage(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  console.log('running cron job nishant')
  
  let listings = await database.listDocuments(req.variables['DATABASE_ID'], req.variables['COLLECTION_ID'],
      [
          Query.equal('isExpired', [false])
      ]
  )


  const today = new Date().toJSON().slice(0, 10)
  
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

  res.json({
    areDevelopersAwesome: true,
    updatedListings
  });
  
};
