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
    let view = url.searchParams.get("view");
    let isbn = url.searchParams.get("isbn");
    if(typeof view === "string"&&typeof isbn === "string"){
        //let json = JSON.parse(view)
        //console.log(view, isbn)
        let n = Number(view)+1
        await client.connect();
        const db = client.db('readlight')
        const user = db.collection('books')
        const book = await user.findOne({ "isbn13" : {$eq: Number(isbn)}})
        if(book !== null){
            db.collection("books").updateOne({"isbn13": {$eq: Number(isbn)}},{ $set: {view: n}})
        }
    }

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}