import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    let lib = url.searchParams.get('lib')
    /*//아래는 시험 코드
    let arr;
    if(typeof lib === "string"){
        arr = JSON.parse(lib)
    }
    for(let i=0; i<arr.length; i++){
        let res = await fetch(`http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=DeONyyEsNs4KHc9FZTXR1JyxFJuv5fLEKNP8zorEN%2F3sBlPPZwvxwVUpSiGq7VtSgvjOK1cqvAhI48I%2BOeK0XA%3D%3D&pageNo=1&numOfRows=100&type=json&LBRRY_NM=${arr[i][3]}`)
    }
    //위이는 시험 코드*/
    
    let res = await fetch(`http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=DeONyyEsNs4KHc9FZTXR1JyxFJuv5fLEKNP8zorEN%2F3sBlPPZwvxwVUpSiGq7VtSgvjOK1cqvAhI48I%2BOeK0XA%3D%3D&pageNo=1&numOfRows=100&type=json&LBRRY_NM=${lib}`)
    let json = await res.json()
    return new Response(JSON.stringify(json), {
        headers:{
            'Content-Type':'application/json'
        }
    })
}