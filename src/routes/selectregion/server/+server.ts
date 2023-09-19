import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ url }) => {
    let lib = url.searchParams.get('lib')
    let brr = []
    if (typeof lib === "string") {
        let arr = JSON.parse(lib)
        for (let i = 0; i < arr.length; i++) {
            let res = await fetch(`http://data4library.kr/api/bookExist?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&libCode=${arr[i].sum}&isbn13=${arr[i].isbn}&format=json`)
            let json = await res.json()
            brr.push(json.response)
        }
    }

    return new Response(JSON.stringify(brr), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}