import type { RequestHandler } from "./$types";

export const GET:RequestHandler = async ({url}) => {
    let arr = url.searchParams.get("arr")
    let brr;
    if(typeof arr === "string"){
        brr = JSON.parse(arr)
        console.log(brr,"zzzz")
        for(let i=0; i<brr.length; i++){
            let res = await fetch(`http://data4library.kr/api/srchDtlList?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&isbn13=${brr[i].isbn13}&loaninfoYN=Y&format=json`)
            let zzfQQ = JSON.stringify(await res.json())
            let json = JSON.parse(zzfQQ)
            console.log(json,"json")
            if(typeof json.response.error === "string"){
                //console.log(`${i}번째 이상해씨 발`)
                brr[i] = {
                    "_id":brr[i]._id,
                    "likecount":brr[i].likecount,
                    "like_users":brr[i].like_users,
                    "view":brr[i].view,
                    "isbn13":brr[i].isbn13,
                    "title":"",
                    "writer":"",
                    "publisher":"",
                    "thumnail":"",
                    "coment":"",
                    "number":i,
                    "class_nm":"",
                    "region_rank":"",
                    "age_rank":"",
                    "all_rank":""
                }
            }else{
                //console.log(`${i}번째 인생...`)
                //console.log(zzfQQ)
                /*console.log(json.response.loanInfo[0].Total,` 이건 니 전부`)
                console.log(json.response.loanInfo[1],`이건 니가 살던 집 `)
                console.log(json.response.loanInfo[2],`이건 니가온 인생`)
                console.log(json.response.loanInfo[3],`그리고 이건 너의 기억...`)*/
                brr[i] = {
                    "_id":brr[i]._id,
                    "likecount":brr[i].likecount,
                    "like_users":brr[i].like_users,
                    "view":brr[i].view,
                    "isbn13":brr[i].isbn13,
                    "title":json.response.detail[0].book.bookname,
                    "writer":json.response.detail[0].book.authors,
                    "publish":json.response.detail[0].book.publisher,
                    "thumnail":json.response.detail[0].book.bookImageURL,
                    "coment":json.response.detail[0].book.description,
                    "number":i,
                    "class_nm":json.response.detail[0].book.class_nm,
                    "all_rank":json.response.loanInfo[1].Total,
                    "region_rank":json.response.loanInfo[2].regionResult,
                    "age_rank":json.response.loanInfo[3].ageResult
                }
            }
        }console.log(brr,"brr")
    }
    
    return new Response(JSON.stringify(brr), {
        headers: {
            'Content-Type':'text/xml'
        }
    })
}