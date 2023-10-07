import { MongoClient, ServerApiVersion } from 'mongodb'
import type { RequestHandler } from "./$types";
import { my_id } from '$lib/stroe';
const uri = "mongodb+srv://kite1337:kkang1128!@cluster0.9eixing.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export const GET: RequestHandler = async ({ url }) => {
    let res = url.searchParams.get("view");
    if(typeof res === "string"){
        await client.connect();
        const db = client.db('readlight')
        const user = db.collection('books')
        const book = await user.findOne({isbn13: res})
        if(book !== null){
            book.view++
        }
    }

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}