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
    let barray = url.searchParams.get("barray");
    let sent;
    await client.connect();
    const db = client.db('readlight');
    const User = db.collection('books');
    if (typeof barray === "string") {
        let res = JSON.parse(barray)
        let status;
        for (let i = 0; i < res.length; i++) {
            let dbbook = await User.findOne({ isbn13: res[i].isbn13 })
            if (dbbook === null) {
                await User.insertOne({
                    title: res[i].title, writer: res[i].writer, publisher: res[i].publish, likecount: res[i].favorite, like_users: [], view: res[i].view, isbn13: res[i].isbn13
                })
            } else {
                res[i].favorite = dbbook.likecount
                res[i].like_users = dbbook.like_users
                res[i].view = dbbook.view
                for(let j=0; i<Object.keys(dbbook.like_users).length; j++){
                    if(dbbook.like_users[j] === my_id){
                        res[i].favorite_click = 1
                    }else res[i].favorite_click = 0
                }
            }
            
            sent = res
        }
    }
    

    return new Response(JSON.stringify(sent), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}