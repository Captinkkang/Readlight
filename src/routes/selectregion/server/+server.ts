import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    let lib = url.searchParams.get('lib')
    let isbn = url.searchParams.get('isbn')
    
    let res = await fetch(`http://data4library.kr/api/bookExist?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&libCode=${lib}&isbn13=${isbn}&format=json`)
    let json = await res.json()
    return new Response(JSON.stringify(json), {
        headers:{
            'Content-Type':'application/json'
        }
    })
}