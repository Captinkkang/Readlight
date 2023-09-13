const { MongoClient, ServerApiVersion } = require('mongodb');
//import { MongoClient, ServerApiVersion } from 'mongodb'
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
let answer;
export const GET:RequestHandler = async ({url}) => {
  let mail = url.searchParams.get("mail");
  let user = url.searchParams.get("user");

  const db = client.db('readlight');
  const User = db.collection('user');
  const id = User.find({_id:user})
  if(!id){
    User.insert({
      "_id": user,
      "mail": mail,
      "islogin": true
    })
    answer = "new"
  }else {answer = "old"}
  return new Response(JSON.stringify(answer), {
    headers: {
        'Content-Type':'application/json'
    }
  })
}
/*async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db('readlight');
    const collection = db.collection('user');
    const cursor = collection.find({});
    for(let i = 0; i < 10; i += 2){
      console.log(await collection.find({}).skip(i).limit(2).toArray())
    }
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/