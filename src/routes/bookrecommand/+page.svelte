<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    const url = '/search.json'
    interface Ibooks{
        title:string;
        fulltitle:string;
        writer:string;
        publish:string;
        thumnail:string;
        coment:string;
        view:number;
        favorite:number;
        number:number;
    }
    let arr:Ibooks[] = [];
    let brr:Ibooks[] = [];
    onMount(async () => {
        const res = await fetch(url);
        const json = await res.json();
        arr = json
        for(let i = 0; i < arr.length; i++){
            if(arr[i].title.length > 11){
                arr[i].fulltitle = arr[i].title
                arr[i].title = arr[i].title.slice(0,11)
            }
        }
        for(let i=0; i<arr.length; i++){
            arr[i].number = i+1
        }
        brr = arr
    })

    
    
    let loveit:number[] = [];
    /*
        장르별 분류가능
    */
</script>
<main>
    <div class="con">
        
    <div class="librarian background">
        <div class="title">사서 추천 도서</div>
        <div class="book-list">
            <span></span>
            <div class="books">
                {#each arr as {title, writer, publish, thumnail, coment, view, favorite, number}}
                    <div class="book" on:contextmenu={(e)=>{
                        e.preventDefault()
                        view++
                    }}>
                        <div class="content">
                            <div class="title"><span style="color: white;">.</span>{title}...</div>
                            <div class="book-image">
                                <img src="{thumnail}">
                            </div>
                            <div class="writer"><span style="color: white;">.</span>{writer} 저</div>
                            <div class="coment"><span style="color: white;">.</span>-{coment}</div>
                            <div class="publish">{publish}</div>
                        </div>
                        <div class="loveit">
                            <span class="eye">
                                <img src="./eye2.svg" alt="press F5">{view}
                            </span>
                            <span class="heart">
                                <input type="checkbox" id="inp{number}" value="{number}" bind:group={loveit}>
                                <label class="img" for="inp{number}"></label>{favorite}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="libraries background">
        <div class="title">도서관별 추천 도서</div>
        <div class="book-list">
            <span></span>
            <div class="books">
                {#each brr as {title, writer, publish, thumnail, coment, view, favorite, number}}
                <div class="book" on:contextmenu={(e)=>{
                    e.preventDefault()
                    view++
                }}>
                    <div class="content">
                        <div class="title"><span style="color: white;">.</span>{title}...</div>
                        <div class="book-image">
                            <img src="{thumnail}">
                        </div>
                        <div class="writer"><span style="color: white;">.</span>{writer} 저</div>
                        <div class="coment"><span style="color: white;">.</span>-{coment}</div>
                        <div class="publish">{publish}</div>
                    </div>
                    <div class="loveit">
                        <span class="eye">
                            <img src="./eye2.svg" alt="press F5">{view}
                        </span>
                        <span class="heart">
                            <input type="checkbox" id="inp{number}" value="{number}" bind:group={loveit}>
                            <label class="img" for="inp{number}"></label>{favorite}
                        </span>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
    </div>
</main>
<style>
    main{
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: column;
        overflow: auto;
        align-items: center;
    }

    .background {
        width: 90vw;
        /*background-color: #D9D9D9;
        filter: opacity(90%);*/
        background-color: rgba(217, 217, 217, 0.9);
        height: 62vh;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
    }
    .books {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .book {
        margin-left: 20px;
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
    .loveit {
        background-color: lightgray;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .eye > img {
        width: 15px;
        height: 15px;
    }
    .heart > input{
        width: 15px;
        height: 15px;
    }
    .book:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 1px 1px 5px 0px;
    }
    .book-image {
        width: 100%
    }
    input[type="checkbox"] {
        background-image: url("/Readlight/static/nonclickheart.svg");
    }
    input[type="checkbox"]:checked + label {
        background-image: url("/Readlight/static/clickheart.svg");
    }
</style>