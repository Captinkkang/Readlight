<script lang="ts">
    import { onMount } from "svelte";
    const url = '/publishingbook/api'
    interface Ibooks{
        title:string;
        fulltitle:string;
        writer:string;
        publish:string;
        thumnail:string;
        price:string;
    }
    let arr: Ibooks[] = []
    let loveit:number[] = [];
    let ready = false;
    onMount(async () => {
        let res = await fetch(url);
        //console.log(await res.json(),'res')
        const json = await res.json();
        //console.log(JSON.stringify(json),'docs')
        
        for(let i=0; i<json.docs.length; i++){
            let insert = {
                title: json.docs[i].TITLE,
                fulltitle:"",
                writer: json.docs[i].AUTHOR,
                publish: json.docs[i].PUBLISHER,
                thumnail: json.docs[i].TITLE_URL,
                price: json.docs[i].PRE_PRICE
            }
            arr.push(insert)
        }
        //console.log(arr)
        ready = true
        /*for(let i = 0; i < arr.length; i++){
            if(arr[i].title.length > 11){
                arr[i].fulltitle = arr[i].title
                arr[i].title = arr[i].title.slice(0,11)
            }
        }*/
        /*for(let i=0; i<arr.length; i++){
            arr[i].number = i+1
        }*/
    })
</script>

<main>
    <div class="align-con">
        {#if ready === true}
            <div class="con">
                <div class="title">출판 예정 도서</div>
                <div class="books">
                    {#each arr as {thumnail, title, publish, writer, price}}
                    <div class="book" on:contextmenu={(e)=>{
                        e.preventDefault()
                        //view++
                    }}>
                        <div class="content">
                            <div class="title"><span style="color: white;">.</span>{title}...</div>
                            <div class="book-image">
                                <img src="{thumnail}">
                            </div>
                            <div class="writer"><span style="color: white;">.</span>{writer} 저</div>
                            <div class="coment"><span style="color: white;">.</span>-가격: {price}원</div>
                            <div class="publish">{publish}</div>
                        </div>
                    </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
    
</main>

<style>
    main {
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .align-con {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .con {
        width: 90vw;
        /*background-color: #D9D9D9;
        filter: opacity(90%);*/
        background-color: rgba(217, 217, 217, 0.9);
        height: 62vh;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        flex-direction: column;
        align-items: center;
        overflow: auto;
    }
    .books {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    .book {
        margin-left: 20px;
        margin-top: 10px;
        width: 13vw;
        height: 58vh;
        background-color: white;
        box-shadow: 2px 0px 5px 0px;
        border-radius: 5px;
        transition: 0.5s;
    }
    .title {
        font-weight: bold;
        color: rgba(46, 16, 0, 0.819);
    }
    img {
        width: 13vw;
        height: 38vh;
    }
    .writer {
        font-weight: 800;
    }
    .coment {
        padding-bottom: 5vh;
    }
    .publish {
        text-align: right;
    }
    .book:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 1px 1px 5px 0px;
    }
    .book-image {
        width: 100%
    }
</style>
