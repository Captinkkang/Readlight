//const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb'
import type { RequestHandler } from "./$types";
const uri = "mongodb+srv://kite1337:kkang1128!@cluster0.9eixing.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export const GET:RequestHandler = async ({url}) => {
  let mail = url.searchParams.get("mail");
  let me;
  await client.connect();

  const db = client.db('readlight');
  const User = db.collection('user');
  if(await User.findOne({mail: mail}) === null){
    User.insertOne({
      "mail": mail,
      "islogin": true
    })
  }
  

  return new Response("ok", {
    headers: {
        'Content-Type':'application/json'
    }
  })
}