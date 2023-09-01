import type { RequestHandler } from "./$types";

export const GET:RequestHandler = async ({url}) => {
    let date = url.searchParams.get("date")
    let ago = url.searchParams.get("ago")
    let res = await fetch(`https://nl.go.kr/NL/search/openApi/saseoApi.do?key=1a989b495091570378f11846a9682ab26a127dfcf568d75db8e0ab718ab671ff&startRowNumApi=1&endRowNumApi=10&start_date=${ago}&end_date=${date}`)
    let text = await res.text()
    //let xml = new DOMParser().parseFromString(text, 'application/xml');
    //console.log(text,'text',xml,'xml')
    return new Response(JSON.stringify(text), {
        headers: {
            'Content-Type':'text/xml'
        }
    })
}