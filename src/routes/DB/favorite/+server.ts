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
        console.log(json)
        let click = json.favorite_click
        await client.connect();
        const db = client.db('readlight');
        const User = db.collection('books');
        const book = await User.findOne({isbn: json.isbn})
        if(click === 1&&book !== null){
            book.updateOne({isbn: json.isbn},{ $push: {like_users: my_id}},{ $set: {likecount: json.favorite}})
            //book.updateOne({isbn: json.isbn},{ $set: {likecount: json.favorite}})
        }else if(click === 0&&book !== null){
            book.updateOne({isbn: json.isbn},{ $pull: {like_users: my_id}},{ $set: {likecount: json.favorite}})
        }
    }

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}