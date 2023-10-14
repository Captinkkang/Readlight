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
    let res = url.searchParams.get("click");
    if(typeof res === "string"){
        let json = JSON.parse(res)
        let click = json.favorite_click
        await client.connect();
        const db = client.db('readlight');
        const User = db.collection('books');
        const book = await User.findOne({ "isbn13": {$eq: json.isbn}})
        if(click === 0&&book !== null){
            db.collection("books").updateOne({"isbn13": {$eq: json.isbn}},{ $push: {like_users: json.id}})
            db.collection("books").updateOne({"isbn13": {$eq: json.isbn}},{ $set: {likecount: json.favorite+1}})
        }else if(click === 1&&book !== null){
            db.collection("books").updateOne({"isbn13": {$eq: json.isbn}},{ $pull: {like_users: json.id}})
            db.collection("books").updateOne({"isbn13": {$eq: json.isbn}},{ $set: {likecount: json.favorite-1}})
        }
    }

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}