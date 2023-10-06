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
  let mail = url.searchParams.get("user");
  let msg = 0
  if(typeof mail === "string"){
    await client.connect();
    let obj = JSON.parse(mail)
    const db = client.db('readlight');
    const User = db.collection('user');
    const find = await User.findOne({mail: obj.id})
    if(find === null){
      User.insertOne({
        "mail": obj.id,
        "pw": obj.pw
      })
      msg = 0
    }else if(find.pw === obj.pw){
      msg = 1
    }
  }

  return new Response(JSON.stringify({answer:msg}), {
    headers: {
        'Content-Type':'application/json'
    }
  })
}