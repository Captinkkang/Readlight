<script lang="ts">
    //let bookList = fetch('/static/search.json')
    //console.log(bookList, 'booklist')
    interface Ibooks{
        bookthumnail:string;
        booktitle:string;
        bookpublisher:string;
        bookwriter:string;
    }
    //console.log(bookList, bookList)
    let arr:Ibooks[] = []
    /*for(let i=0; i < books.length; i++){
        arr.push()
        
    }*/
</script>
<main>
    <div class="input-wrapper">
        <div id="input">
            <button></button>
            <input type="search" autocomplete="off" spellcheck="false" role="combobox" aria-controls="matches" placeholder=" 도서 검색" aria-expanded="false" aria-live="polite">
        </div>
    </div>
    <div class="book-container">
        <div>찾을 책을 선택해 주세요</div>
        {#each arr as {bookthumnail, booktitle, bookpublisher, bookwriter}}
            <div class="books">
                <img class="book-image" src="{bookthumnail}">
                <div class="book-inform">
                    <div>제목: {booktitle}</div>
                    <div>지은이: {bookwriter}</div>
                    <div>출판사: {bookpublisher}</div>
                </div>
            </div>
        {/each}
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
    }
</style>