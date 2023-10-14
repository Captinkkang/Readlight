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
    //console.log(barray)
    let sent;
    await client.connect();
    const db = client.db('readlight');
    const User = db.collection('books');
    if (typeof barray === "string") {
        let res = JSON.parse(barray)
        //console.log(res)
        for (let i = 0; i < res.length; i++) {
            let dbbook = await User.findOne({ "isbn13": {$eq: res[i].isbn} })
            //console.log(dbbook, res[i].isbn,`now is ${i}번째`)
            if (dbbook === null) {
                await User.insertOne({
                    likecount: 0, like_users: [], view: 0, isbn13: res[i].isbn
                })
            } else {
                res[i].likecount = dbbook.likecount
                res[i].like_users = dbbook.like_users
                res[i].view = dbbook.view
                if(res[i].id !== ""){
                    //console.log(dbbook.like_users[0] === "kite1337", dbbook._id,"아핳핳 하")
                    for(let j=0; i<dbbook.like_users.length; j++){
                        if(dbbook.like_users[j] === res[i].id){
                            res[i].favorite_click = 1
                            break
                        }
                    }
                }
                
            }
        }sent = res
        //console.log(sent,JSON.stringify(sent))
    }
    

    return new Response(JSON.stringify(sent), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}