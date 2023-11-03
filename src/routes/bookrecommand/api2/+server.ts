import type { RequestHandler } from "./$types";

export const GET:RequestHandler = async ({url}) => {
    let arr = url.searchParams.get("arr")
    let brr;
    if(typeof arr === "string"){
        brr = JSON.parse(arr)
        for(let i=0; i<brr.length; i++){
            let res = await fetch(`http://data4library.kr/api/srchDtlList?authKey=b08eefde44fca41c8d13b5574ca3472976670554ea7690a72ab823dba3f44206&isbn13=${brr[i].isbn13}&loaninfoYN=Y&format=json`)
            let json = await res.json()
            //console.log(json.response)
            if(json.response.error === "ISBN을 확인해 주시기 바랍니다."){
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
            }else {
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
                    "all_rank":json.response.loaninfo[0].Total.ranking,
                    "region_rank":json.response.loaninfo[0].regionResult.region.ranking,
                    "age_rank":json.response.loaninfo[0].ageResult.age.ranking
                }
            }
        }console.log(JSON.stringify(brr)===String(brr))
    }
    
    return new Response(JSON.stringify(brr), {
        headers: {
            'Content-Type':'text/xml'
        }
    })
}