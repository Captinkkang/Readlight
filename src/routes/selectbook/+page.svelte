<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { islogin } from "$lib/stroe";
    interface Ibooks {
        title: string;
        fulltitle: string;
        coment: string;
        publish: string;
        writer: string;
        fullwriter: string;
        thumnail: string;
        isbn13: string;
        view: number;
        favorite: number;
        favorite_click: number;
        like_users: object;
        number: number;
        full: boolean;
        full2: boolean;
    }
    let arr: Ibooks[] = [];
    onMount(async () => {
        if (localStorage.getItem("selectbook")) {
            let sentdata = localStorage.getItem("selectbook");
            if (typeof sentdata !== "string") return;
            let res = JSON.parse(sentdata);
            arr = res;
            for (let i = 0; i < arr.length; i++) {
                arr[i].fulltitle = arr[i].title;
                if (arr[i].title.length > 11) {
                    arr[i].title = arr[i].title.slice(0, 11);
                }
                arr[i].full = false;
                arr[i].fullwriter = arr[i].writer;
                if (arr[i].writer.length > 11) {
                    arr[i].writer = arr[i].writer.slice(0, 11);
                }
                arr[i].full2 = false;
            }
        }
        //let barray = JSON.stringify(arr)
        //console.log(arr)
        let sent = [];
        for(let i=0; i < arr.length; i++){
            //console.log(arr[i].like_users)
            sent.push({likecount: arr[i].favorite, like_user: [], favorite_click: arr[i].favorite_click, view: arr[i].view, isbn: Number(arr[i].isbn13)})
        }
        //console.log(JSON.stringify(sent),"sent")
        let res = await fetch(`/DB/Books?barray=${JSON.stringify(sent)}`)
        let ins = await res.json()
        //console.log(ins, typeof ins)
        for(let i=0; i<arr.length; i++){
            arr[i].favorite = ins[i].likecount
            arr[i].like_users = ins[i].like_user
            arr[i].favorite_click = ins[i].favorite_click
            arr[i].view = ins[i].view
        }
        console.log(arr)
    });
</script>

<main>
    <div class="flex-book">
        <div class="book-container">
            <div class="message">찾은 책을 선택해 주세요</div>
            <div class="book-list">
                {#each arr as { thumnail, title, fulltitle, publish, writer, fullwriter, coment, view, favorite, favorite_click, like_users, number, full, full2, isbn13 }}
                    <div
                        class="book"
                        on:contextmenu={async (e) => {
                            e.preventDefault();
                            view++;
                            await fetch(`DB/view?view=${{isbn: Number(isbn13), view: view}}`)
                            let go = await fetch(`selectbook/server?isbn=${isbn13}`)
                            let info = await go.json()
                            console.log(info)
                        }}
                    >
                        <div class="content">
                            <div class="title">
                                <span style="color: white;">&nbsp;</span>
                                {#if fulltitle !== title}
                                    {#if full === false}
                                        {title}
                                        <span
                                            class="change"
                                            on:keypress={()=>{}}
                                            on:click={() => {
                                                full = true;
                                            }}>...</span
                                        >
                                    {:else}
                                        {fulltitle}
                                        <span
                                            class="change"
                                            on:keypress={()=>{}}
                                            on:click={() => {
                                                full = false;
                                            }}>&lt;</span
                                        >
                                    {/if}
                                {:else}
                                    {title}
                                {/if}
                            </div>
                            <div
                                class="book-image"
                                on:keypress={()=>{}}
                                on:click={() => {
                                    let sent = arr[number];
                                    localStorage.setItem(
                                        "selectregion",
                                        JSON.stringify(sent)
                                    );
                                    
                                    goto("/selectregion");
                                }}
                            >
                                <img src={thumnail} alt="press F5"/>
                            </div>
                            <div class="writer">
                                <span style="color: white;">&nbsp;</span
                                >{#if fullwriter !== writer}
                                    {#if full2 === false}
                                        {writer}
                                        <span
                                            class="change"
                                            on:keypress={()=>{}}
                                            on:click={() => {
                                                full2 = true;
                                            }}>...</span
                                        >
                                    {:else}
                                        {fullwriter}
                                        <span
                                            class="change"
                                            on:keypress={()=>{}}
                                            on:click={() => {
                                                full2 = false;
                                            }}>&lt;</span
                                        >
                                    {/if}
                                {:else}
                                    {writer}
                                {/if}
                            </div>
                            <div class="coment">
                                <span style="color: white;">&nbsp;</span
                                >-{coment}
                            </div>
                            <div class="publish">{publish}</div>
                        </div>
                        <div class="loveit">
                            <span class="eye">
                                <img src="./eye2.svg" alt="press F5" />{view}
                            </span>
                            <div
                                class="heart"
                                on:keypress={()=>{}}
                                on:click={async () => {
                                    let newh;//나를 제외한 좋아요 수
                                    if(favorite_click === 1){
                                        newh = favorite-1
                                    }else newh = favorite
                                    if($islogin === true){
                                        if(newh === favorite){
                                            favorite++
                                            favorite_click = 1
                                        }else {
                                            favorite--
                                            favorite_click = 0
                                        }
                                        let sent = {favorite: favorite, favorite_click:favorite_click, isbn:Number(isbn13)}
                                        await fetch(`/DB/favorite?click=${JSON.stringify(sent)}`)
                                    }else {alert("로그인 후 이용가능합니다.")}
                                }}
                            >
                                {#if favorite_click === 0}
                                    <img src="/heart.svg" alt="press F5"/>
                                {:else}
                                    <img src="/filled-heart.svg" alt="press F5"/>
                                {/if}
                                {favorite}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
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
    }
    .book-container {
        width: 90vw;
        background-color: rgba(217, 217, 217, 0.9);
        height: 85vh;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .message {
        font-size: 24px;
        width: 100%;
        text-align: center;
        font-weight: bolder;
    }
    .flex-book {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .book-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 10px;
    }
    .book {
        margin-left: 20px;
        margin-bottom: 20px;
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
        padding-bottom: 2vh;
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
    .heart > img {
        width: 15px;
        height: 15px;
    }
    .book:hover {
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 1px 1px 5px 0px;
    }
    .book-image {
        width: 100%;
    }
    .change {
        transition: 1s;
        color: rgba(46, 16, 0, 0.819);
    }
    .change:hover {
        background-color: lavender;
        border-radius: 45px;
    }
</style>
