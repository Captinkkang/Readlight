import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ url }) => {
    let isbn = url.searchParams.get('isbn')
    let res = await fetch(`http://data4library.kr/api/srchDtlList?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&isbn13=${isbn}&loaninfoYN=Y&displayInfo=age&format=json`)
    let json = await res.json()
    console.log(json)
    

    return new Response(JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}