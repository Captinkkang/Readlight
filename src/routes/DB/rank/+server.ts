import { MongoClient, ServerApiVersion } from 'mongodb'
import type { RequestHandler } from "./$types";
const uri = "mongodb+srv://kite1337:kkang1128!@cluster0.9eixing.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
export const GET:RequestHandler = async ({}) => {
    await client.connect()
    const db = client.db("readlight")
    const user = db.collection("books")
    let arr = await user.find({}).sort({"likecount":-1}).sort({"view":-1}).limit(30).toArray()
    //console.log(arr)
    return new Response(JSON.stringify(arr), {
      headers: {
          'Content-Type':'application/json'
      }
    })
  }