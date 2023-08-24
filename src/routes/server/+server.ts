import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    let index = url.searchParams.get('keyword')
    let res = await fetch(`http://data4library.kr/api/srchBooks?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&title=${index}&pageNo=1&pageSize=100&format=json`);
    let json = await res.json()
    return new Response(JSON.stringify(json), {
        headers:{
            'Content-Type':'application/json'
        }
    })
}