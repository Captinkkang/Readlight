<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    const url = '/search.json';
    //console.log(booklist, 'booklist')
    interface Ibooks{
        title:string;
        publish:string;
        writer:string;
        thumnail:string;
    }
    //console.log(bookList, bookList)
    let arr:Ibooks[] = []
    onMount(async () => {
        const res = await fetch(url);
        const json = await res.json();
        arr = json
    })
</script>
<main>
    <div class="input-wrapper">
        <div></div>
        <div id="input">
            <button></button>
            <input type="search" autocomplete="off" spellcheck="false" role="combobox" aria-controls="matches" placeholder=" 도서 검색" aria-expanded="false" aria-live="polite">
        </div>
    </div>
    <div class="flex-book">
        <div class="book-container">
            <div class="message">찾을 책을 선택해 주세요</div>
            <div class="book-list">
                {#each arr as {thumnail, title, publish, writer}}
                    <div class="books" on:click={()=>goto('/selectregion')}>
                        <img class="book-image" src="{thumnail}">
                        <div class="book-inform">
                            <div>제목: {title}</div>
                            <div>지은이: {writer}</div>
                            <div>출판사: {publish}</div>
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
    }

    #input {
        position: relative;
        background-color: #2B2930;
        width: 100%;
        max-width: 500px;
        margin:0 10px;
        box-sizing: border-box;
        height: 50px;
        border-radius: 25px;
        padding:10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button {
        box-sizing: border-box;
        border:none;
        height: 100%;
        width:30px;
        background-color: inherit;
        background-size: 120%;
        background-position: center;
        background-image: url("/search.svg");
    }

    #input > input{
        background-color: inherit;
        outline: none;
        border: none;
        height:100%;
        flex-grow: 1;
        box-sizing: border-box;
        color:white;
    }

    .input-wrapper {
        display: flex;
        justify-content: space-between;
        margin-right: -8px;
    }

    .book-container {
        width: 90vw;
        background-color: #D9D9D9;
        filter: opacity(90%);
        height: 90vh;
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
    .books {
        margin-left: 20px;
        width: 13vw;
        height: 15vh;
        background-color: black;
        color: white;
    }
    .books:hover {
        cursor: pointer;
    }
    .book-image {
        width: 100%
    }
</style>