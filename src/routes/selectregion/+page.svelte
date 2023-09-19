<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import { json } from "@sveltejs/kit";

    interface Ibooks {
        title: string;
        fulltitle: string;
        coment: string;
        publish: string;
        writer: string;
        thumnail: string;
        isbn13: string;
        view: number;
        favorite: number;
        favorite_click: number;
        number: number;
    }

    let drr: [string[]] = [[""]];
    let regions: String[] = []; //기본
    let useful: String[] = []; //태그를 바꿀 기본의 복제형
    let ready = false;
    let book: Ibooks;
    onMount(async () => {
        const res = await fetch("/20201029_.csv");
        const csv = await res.text();
        let brr = csv.split("\n");
        brr.splice(0, 2);
        for (let i = 0; i < brr.length; i++) {
            let crr = brr[i].split(",");
            crr.splice(5, 2);
            crr.splice(1, 1);
            crr[1] = crr[1] + crr[2];
            crr.splice(2, 1);
            drr.push(crr);
        }
        drr.shift();
        let sum = [];
        for (let i = 0; i < drr.length; i++) {
            sum.push(drr[i][1]);
        }
        for (let i of sum) {
            if (!regions.includes(i)) regions.push(i);
        }
        regions.pop();
        useful = regions;
        ready = true;
        if (localStorage.getItem("selectregion")) {
            let sentdata = localStorage.getItem("selectregion");
            if (typeof sentdata !== "string") return;
            book = JSON.parse(sentdata);
        }
    });

    let value: string; //안쓸 수도 있음
    let checked: string[] = [];
    let libcode: [string[]] = [[""]];
    /*
    방법1: 클릭할때 체크
    방법2: 클릭다 하고 체크
    */
</script>

<main>
    <div class="input-wrapper">
        <div id="input">
            <div style="display: flex; align-items: center;" class="button">
                <IconButton class="material-icons">search</IconButton>
            </div>
            <input
                type="text"
                autocomplete="off"
                spellcheck="false"
                role="combobox"
                aria-controls="matches"
                placeholder=" 지역 검색"
                aria-expanded="false"
                aria-live="polite"
                bind:value
                on:input={() => {
                    ready = false;
                    useful = regions.filter((v) => v.indexOf(value) !== -1);
                    ready = true;
                }}
            />
        </div>
        <Button
            color="secondary"
            variant="raised"
            on:click={async () => {
                if (checked.length > 0) {
                    const res = await fetch("/20201029_.csv");
                    const csv = await res.text();
                    let brr = csv.split("\n");
                    brr.splice(0, 2);
                    for (let i = 0; i < brr.length; i++) {
                        let crr = brr[i].split(",");
                        crr.splice(5, 2);
                        crr.splice(1, 1);
                        crr[1] = crr[1] + crr[2];
                        crr.splice(2, 1);
                        drr.push(crr);
                    }
                    drr.shift();
                    //console.log(drr,'drr')
                    let srr = [];
                    //책 있는 도서관 배열
                    let hasbook = [];
                    for (let i = 0; i < drr.length; i++) {
                        for (let j = 0; j < checked.length; j++) {
                            if (drr[i][1] === checked[j]) {
                                libcode.shift();
                                libcode.push(drr[i]);
                                hasbook.push({"sum":Number(drr[i][4]), "isbn":Number(book.isbn13)})
                                //let res = await sentdata.json();
                                //console.log(res.response,'???res???')
                                //if (res.response.result.hasBook === 'Y') {
                                    /*for (let k = 0; k < libcode.length; k++) {
                                        console.log(libcode[k][3],res.response.result.loanAvailable)
                                        let libinfo = await fetch(
                                            `/selectregion/server2?lib=${libcode[k][3]}`
                                        );
                                        let result = await libinfo.json();
                                        console.log(JSON.stringify(result),'맞춤법ㄷㄷ')
                                        if(result.response.header.resultCode !== "03"){
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
                                            let lib = {
                                                libCode: res.response.request.libCode,
                                                loanAvailable: res.response.result.loanAvailable,
                                                inform: insert,
                                                count:1
                                            };
                                            srr.push(lib);
                                        }else {
                                            let insert = {
                                                name: libcode[k][3],
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
                                            let lib = {
                                                libCode: res.response.request.libCode,
                                                loanAvailable: res.response.result.loanAvailable,
                                                inform: insert,
                                                count:1
                                            }
                                            srr.push(lib)
                                        }
                                    }*/
                                //}
                            }
                        }
                    }
                    
                    let sent = [];
                    //console.log(,'isbook.json')
                    //console.log(JSON.parse(JSON.stringify(hasbook)),'hasbook')
                    let isbook = await fetch(`/selectregion/server?lib=${JSON.stringify(hasbook)}`)
                    let json = await isbook.json()
                    //let lastres = await JSON.parse(json)
                    //console.log(json[0].result)
                    
                    
                    const CSV = await fetch("/librarydata.csv");
                    const libdata = await CSV.text();
                    let libarr = libdata.split("\n");
                    let crr = [];
                    //console.log(libarr)
                    for(let i=0; i<libarr.length; i++){
                        let brr = libarr[i].split(",")
                        crr.push(brr)
                    }
                    //console.log(crr)
                    //console.log(json)
                    for(let i=0; i<crr.length; i++){
                        //console.log(crr[i][0],crr[i][0].split(" "),crr[i][0].split(" ").join(""))
                        crr[i][0] = crr[i][0].split(" ").join("");
                    }
                    //console.log(crr)
                    let libname = [];
                    //console.log(json.length, drr.length)
                    for(let i=0; i<json.length; i++){
                        for(let j=0; j<drr.length; j++){
                            //console.log(json[i].request.libCode,drr[j][4])
                            if(json[i].result.hasBook === 'Y'&&json[i].request.libCode === drr[j][4]){
                                libname.push({name: drr[j][3], available: json[i].result.loanAvailable})
                            }
                        }
                    }
                    //console.log(libname)
                    for(let i=0; i<libname.length; i++){
                        for(let j=0; j<crr.length; j++){
                            //console.log(libname[i].name, crr[j][0])
                            if(libname[i].name === crr[j][0]){
                                let insert = {
                                    name: crr[j][0],
                                    closeday: crr[j][4],
                                    weekopen: crr[j][5],
                                    weekclose: crr[j][6],
                                    endopen: crr[j][9],
                                    endclose: crr[j][10],
                                    hompage: crr[j][22],
                                    post: crr[j][17],
                                    phone: crr[j][19],
                                    latitude: crr[j][23],
                                    longitude: crr[j][24]
                                };
                                let lib = {
                                    loanAvailable: libname[i].available,
                                    inform: insert,
                                    count:1
                                };
                                sent.push(lib)
                            }
                        }
                    }
                    console.log(sent,"finish..?")
                    for(let i=0; i<sent.length; i++){
                        //sent중복검사
                        for(let j=1; j<sent.length; j++){
                            if(sent[i].inform.name === sent[j].inform.name){
                                sent.splice(j,1)
                                if(sent[i])sent[i].count++
                            }
                        }
                    }
                    console.log(sent)
                    /*for(let i=0; i<sent.length; i++){
                            for(let k=1; k<sent.length; k++){
                                if(srr[i].inform.name === srr[k].inform.name){
                                    srr.splice(k,1)
                                    //console.log(srr[i])
                                    if(srr[i])srr[i].count++
                                }
                            }
                        }*/
                    /*brr.splice(0, 2);
                    for (let i = 0; i < brr.length; i++) {
                        let crr = brr[i].split(",");
                        crr.splice(5, 2);
                        crr.splice(1, 1);
                        crr[1] = crr[1] + crr[2];
                        crr.splice(2, 1);
                        drr.push(crr);
                    }
                    */
                    //let info = await fetch(`/selectregion/server2?lib=${JSON.stringify(json)}`)
                    //let infojs = JSON.parse(String(info))
                    
                    /*for(let i=0; i<infojs.length; i++){
                        let lib = {
                            libCode: json.response.request.libCode,
                            loanAvailable: json.response.result.loanAvailable,
                            inform: infojs[i],
                            count:1
                        };
                        sent.push(lib)
                    }*/
                    

                    
                    /*if(srr.length < 0)alert("도서가 해당 지역의 도서관에 없습니다.")
                    else {
                        //console.log(srr)
                        for(let i=0; i<srr.length; i++){
                            //console.log(srr[i].inform,i)
                            for(let k=1; k<srr.length; k++){
                                //console.log(srr[k].inform,k)
                                if(srr[i].inform.name === srr[k].inform.name){
                                    srr.splice(k,1)
                                    console.log(srr[i])
                                    if(srr[i])srr[i].count++
                                }
                            }
                        }
                    }
                    /*console.log(sent)
                    for(let i=0; i<sent.length; i++){
                        srr.splice(sent[i]-i,1)
                    }
                
                    console.log(srr,'srr!!!!!!!!')*/
                    //console.log(JSON.stringify(sent))
                    localStorage.setItem("libraryresult",JSON.stringify(sent))
                    goto('/libraryresult')
                } else alert("지역을 1개 이상 선택해 주세요.");
            }}
        >
            <Label>선택 완료</Label>
        </Button>
    </div>
    <div class="main-container">
        <div class="text">검색에 포함될 지역을 선택해 주세요</div>
        <div class="region-container">
            {#if ready === true}
                {#each useful as i}
                    <div class="check-container">
                        <input
                            type="checkbox"
                            id="inp{i}"
                            value={i}
                            bind:group={checked}
                        />
                        <label class="check-container" for="inp{i}">{i}</label>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input[type="checkbox"] {
        display: none;
    }
    input[type="checkbox"] + label {
        transition: 1s;
    }
    input[type="checkbox"]:checked + label {
        background-color: pink;
        color: black;
    }
    #input {
        position: relative;
        background-color: #2b2930;
        width: 40vw;
        max-width: 500px;
        margin: 0 10px;
        box-sizing: border-box;
        height: 50px;
        border-radius: 25px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .input-wrapper {
        display: flex;
        justify-content: space-between;
        margin-left: 40px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    #input > input {
        background-color: inherit;
        outline: none;
        border: none;
        height: 100%;
        flex-grow: 1;
        box-sizing: border-box;
        color: white;
    }

    .main-container {
        background-color: #d9d9d9;
        filter: opacity(90%);
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 1190px;
        height: 90vh;
        overflow: auto;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: lavenderblush;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: lavender;
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: lightsteelblue;
    }
    ::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }

    .text {
        font-size: 20px;
        width: 1100px;
        text-align: center;
        border-bottom: 2px solid black;
        margin-bottom: 5px;
    }
    .region-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .check-container {
        display: flex;
        width: 10vw;
        height: 60px;
        border-radius: 20px;
        background-color: #5e5d87;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        color: white;
        border: none;
    }
    .check-container > label {
        text-align: center;
    }
    .check-container:hover {
        cursor: pointer;
    }
    .button {
        color: white;
        margin-right: 25px;
        box-sizing: border-box;
        border: none;
        height: 100%;
        width: 30px;
        background-color: inherit;
        background-size: 120%;
        background-position: center;
    }
</style>
