import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ url }) => {
    let lib = url.searchParams.get('lib')

    let brr = []
    if (typeof lib === "string") {
        let arr = JSON.parse(lib)
        //도서관 이름을 넣어야 함
        //도서관 이름 파일을 다운 받아서 static저장 후 가공해야할 듯=>이걸 화요일까지 끝낸다->수요일 부터는 본격적으로 로그인에 들어가야 10일 안에 뭐가 됨
        for (let i = 0; i < arr.length; i++) {
            let res = await fetch(`http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=DeONyyEsNs4KHc9FZTXR1JyxFJuv5fLEKNP8zorEN%2F3sBlPPZwvxwVUpSiGq7VtSgvjOK1cqvAhI48I%2BOeK0XA%3D%3D&pageNo=1&numOfRows=100&type=json&LBRRY_NM=${arr[i][3]}`)
            let result = await res.json()
            console.log(result)
            if (result.response.header.resultCode !== "03") {
                let insert = {
                    name: result.response.body.items[0].lbrryNm,
                    closeday: result.response.body.items[0].closeDay,
                    weekopen: result.response.body.items[0].weekdayOperOpenHhmm,
                    weekclose: result.response.body.items[0].weekdayOperColseHhmm,
                    endopen: result.response.body.items[0].satOperOperOpenHhmm,
                    endclose: result.response.body.items[0].satOperCloseHhmm,
                    hompage: result.response.body.items[0].homapageUrl,
                    post: result.response.body.items[0].rdnmadr,
                    phone: result.response.body.items[0].phoneNumber,
                    latitude: result.response.body.items[0].latitude,
                    longitude: result.response.body.items[0].longitude
                };
                brr.push(insert)
            } else {
                let insert = {
                    name: "",
                    closeday: "00",
                    weekopen: "00",
                    weekclose: "00",
                    endopen: "00",
                    endclose: "00",
                    hompage: "",
                    post: "",
                    phone: "",
                    latitude: "",
                    longitude: ""
                }
                brr.push(insert)
            }
        }
        console.log(brr)
    }


    //let res = await fetch(`http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=DeONyyEsNs4KHc9FZTXR1JyxFJuv5fLEKNP8zorEN%2F3sBlPPZwvxwVUpSiGq7VtSgvjOK1cqvAhI48I%2BOeK0XA%3D%3D&pageNo=1&numOfRows=100&type=json&LBRRY_NM=${lib}`)
    //let json = await res.json()
    return new Response(JSON.stringify(brr), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}