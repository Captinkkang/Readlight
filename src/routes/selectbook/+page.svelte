<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import IconButton from "@smui/icon-button";
    const url = '/search.json';
    //console.log(booklist, 'booklist')
    interface Ibooks{
        title:string;
        fulltitle:string;
        coment:string
        publish:string;
        writer:string;
        thumnail:string;
        view:number;
        favorite:number;
        number:number;
    }
    //console.log(bookList, bookList)
    let arr:Ibooks[] = []
    let useful;
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
    })
    
    let heart:HTMLImageElement;
    let likes = [];
    let hclick = 0;
</script>
<main>
    
    <div class="flex-book">
        <div class="book-container">
            <div class="message">찾은 책을 선택해 주세요</div>
            <div class="book-list">
                {#each arr as {thumnail, title, publish, writer, coment, view, favorite, number}}
                    <div class="book" on:contextmenu={(e)=>{
                        e.preventDefault()
                        view++
                    }}>
                        <div class="content" on:click={()=>{goto('/selectregion')}}>
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
                            <div class="heart" on:click={()=>{
                                let res = favorite;

                                //로그인 한 상태 일꺼임
                                //하트를 누른다

                                //db에 있는 책 테이블/좋아요 명단에 내 아이디가 있다면
                                //좋아요 수 1감소
                                //하트가 비워짐

                                //db에 있는 책 테이블/좋아요 명단에 내 아이디가 없다면
                                //좋아요 수 1증가
                                //하트가 채워짐
                                
                            }}>
                                {#if favorite}
                                    <img src="/heart.svg">
                                {:else} 
                                    <img src="/filled-heart.svg">
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
    main{
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: column;
    }
    .book-container {
        width: 90vw;
        /*background-color: #D9D9D9;
        filter: opacity(90%);*/
        background-color: rgba(217, 217, 217, 0.9);
        height: 85vh;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
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
    .heart-image{
        background-image: url("/heart.svg");
        background-size: 15px 15px;
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