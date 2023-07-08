<script lang="ts">
    import { goto } from "$app/navigation";

    //let arr:[];{#each arr as res}
               // <input type="checkbox" value="{res}">
            //{/each}
    let regions:String[] = ['서울','부산','대구','인천','광주','대전','울산','세종','파주','안산','시흥','수원','청주','김해','원주','속초','경주','제주']
</script>
<main>
    <div class="input-wrapper">
        <div id="input">
            <button class="search"></button>
            <input type="search" autocomplete="off" spellcheck="false" role="combobox" aria-controls="matches" placeholder=" 지역 검색" aria-expanded="false" aria-live="polite">
        </div>
        <button class="chosing-end" on:click={()=>{goto('/libraryresult')}}>선택 완료</button>
    </div>
    <div class="main-container">
        <div class="text">검색에 포함될 지역을 선택해 주세요</div>
        <div class="region-container">
            {#each regions as i}
                <div class="check-container">
                    <input type="checkbox">
                    <div class="city-name">{i}</div>
                </div>
            {/each}
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
        align-items: center;
    }

    #input {
        position: relative;
        background-color: #2B2930;
        width: 40vw;
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
    .input-wrapper {
        display: flex;
        justify-content: space-between;
        margin-left: 40px;
        margin-bottom: 10px;
        margin-top: 10px;
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
    .search {
        box-sizing: border-box;
        border:none;
        height: 100%;
        width:30px;
        background-color: inherit;
        background-size: 120%;
        background-position: center;
        background-image: url("/search.svg");
    }
    .chosing-end {
        background-color: #2B2930;
        border-radius: 25px;
        border: none;
        box-sizing: border-box;
        color: white;
    }
    .chosing-end:hover {
        cursor: pointer;
    }

    .main-container {
        background-color: #D9D9D9;
        filter: opacity(90%);
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 1190px;
        height: 90vh;
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
        background-color: #5E5D87;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        color: white;
    }
    .city-name{
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }
    .check-container:hover {
        cursor: pointer;
    }
    .check-container > div {
        font-size: 18px;
        
    }
</style>