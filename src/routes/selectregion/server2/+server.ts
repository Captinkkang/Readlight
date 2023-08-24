import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    let lib = url.searchParams.get('lib')
    
    let res = await fetch(`http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=DeONyyEsNs4KHc9FZTXR1JyxFJuv5fLEKNP8zorEN%2F3sBlPPZwvxwVUpSiGq7VtSgvjOK1cqvAhI48I%2BOeK0XA%3D%3D&pageNo=1&numOfRows=100&type=json&LBRRY_NM=${lib}`)
    let json = await res.json()
    return new Response(JSON.stringify(json), {
        headers:{
            'Content-Type':'application/json'
        }
    })
}