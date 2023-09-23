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
        let click = Number(json.num)
        await client.connect();
        const db = client.db('readlight');
        const User = db.collection('books');
        const book = await User.findOne({isbn: json.isbn})
        if(click === 0&&book !== null){
            book.like_users.push(my_id)
            book.likecount++
        }else if(click === 1&&book !== null){
            book.likecount--
            for(let i=0; i<book.like_users.lenght; i++){
                if(book.likeusers[i] === json.isbn){
                    book.like_users.splice(i,1)
                }
            }
        }
    }
        
    
    let sent;
    

    return new Response("ok", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}