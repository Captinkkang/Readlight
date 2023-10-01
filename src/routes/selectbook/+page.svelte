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
        let barray = JSON.stringify(arr)
        console.log(arr)
        let res = await fetch(`/DB/Books?barray=${JSON.stringify(arr)}`)
        if(typeof res === "string"){ 
            arr = JSON.parse(res)
        }
        //for문으로 각각 책에 자기 email있는지 확인하고 있으면 favorite_click=1 해야함
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
                        on:contextmenu={(e) => {
                            e.preventDefault();
                            view++;
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
                                            on:click={() => {
                                                full = true;
                                            }}>...</span
                                        >
                                    {:else}
                                        {fulltitle}
                                        <span
                                            class="change"
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
                                on:click={() => {
                                    let sent = arr[number];
                                    localStorage.setItem(
                                        "selectregion",
                                        JSON.stringify(sent)
                                    );
                                    goto("/selectregion");
                                }}
                            >
                                <img src={thumnail} />
                            </div>
                            <div class="writer">
                                <span style="color: white;">&nbsp;</span
                                >{#if fullwriter !== writer}
                                    {#if full2 === false}
                                        {writer}
                                        <span
                                            class="change"
                                            on:click={() => {
                                                full2 = true;
                                            }}>...</span
                                        >
                                    {:else}
                                        {fullwriter}
                                        <span
                                            class="change"
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
                                on:click={async () => {
                                    let newh;
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
                                        let sent = {num:favorite_click, isbn:isbn13}
                                        await fetch(`/DB/favorite?click=${JSON.stringify(sent)}`)
                                        /*
                                        if (favorite_click === 0) {
                                            favorite++;
                                            favorite_click = 1;
                                        } else {
                                            favorite_click = 0;
                                            favorite--;
                                        }*/
                                    }else {alert("로그인 후 이용가능합니다.")}
                                    
                                    //로그인 true일때
                                    //내가 이 책의 좋아요 유저 정보에 있는지 확인
                                    //없다면 누를때 ++, 다시 누르면 --
                                    //db에 이 책의 isbn등 정보를 Books 콜렉션에 하나 넣는다
                                    
                                    //이후 책을 불러올때 한번 db와 연결
                                    //이 책과 같은 isbn을 가진 책이 db에 있으면
                                    //해당 db데이터의 좋아요수와 조회수를 favorite, view에 각각 넣는다 
                                }}
                            >
                                {#if favorite_click === 0}
                                    <img src="/heart.svg" />
                                {:else}
                                    <img src="/filled-heart.svg" />
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
