import { MongoClient, ServerApiVersion } from 'mongodb'
import type { RequestHandler } from "./$types";
import { my_id } from '$lib/stroe';
import { insert } from 'svelte/internal';
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
        let json = JSON.parse(res)
        await client.connect();
        const db = client.db('readlight')
        const user = db.collection('books')
        const book = await user.findOne({isbn13: json.isbn})
        if(book !== null){
            book.updateOne({isbn13: json.isbn},{ $set: {view: json.view}})
        }
    }

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}