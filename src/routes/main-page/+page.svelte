<script lang="ts">
    import { goto } from "$app/navigation";
    //background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
</script>
<main>
    <div id="content">
        <div id="inputWrapper">
            <div class="title">Readlight</div>
            <div id="input">
                <button></button>
                <input type="search" autocomplete="off" spellcheck="false" role="combobox" aria-controls="matches" placeholder=" 도서 검색" aria-expanded="false" aria-live="polite">
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
    #content{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    #inputWrapper {
        width: 40vw;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 50px;
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
    #input > input{
        background-color: inherit;
        outline: none;
        border: none;
        height:100%;
        flex-grow: 1;
        box-sizing: border-box;
        color:white;
    }

    .title {
        color: white;
        font-size: 64px;
        width: 40vw;
        text-align: center;
        margin-bottom: 20px;
        /* height: ; */
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
</style>
