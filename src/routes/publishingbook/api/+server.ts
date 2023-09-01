import type { RequestHandler} from "./$types";

export const GET:RequestHandler = async () => {
    let res = await fetch(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=1a989b495091570378f11846a9682ab26a127dfcf568d75db8e0ab718ab671ff&result_style=json&page_no=1&page_size=100`)
    let json = await res.json()
    return new Response(JSON.stringify(json), {
        headers:{
            'Content-Type':'application/json'
        }
    })

}