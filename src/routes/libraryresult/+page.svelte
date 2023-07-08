<script lang="ts">
    import { onMount } from "svelte";

    interface Ilibrary{
        name:string
        weekopen:number
        weekclose:number
        endopen:number
        endclose:number
        hompage:string
        latitude:number
        longitude:number
    }
    let container:HTMLDivElement;
    let arr:Ilibrary[] = [{name:'안산 중앙 도서관',weekopen:0, weekclose:24, endopen:0, endclose:24, hompage: 'https://naver.com', latitude: 37.3044, longitude:126.8212},{name:'안산미디어라이브러리',weekopen:0,weekclose:0,endopen:24,endclose:24,hompage:`https://google.com`,latitude:37.307218997374,longitude:126.83132540949}]
    let brr:Ilibrary[] = [{name:'안산 관산 도서관',weekopen:0,weekclose:24,endopen:0,endclose:24,hompage:'https://daum.com',latitude:37.332043787469,longitude:126.79959076287}]
    let yinform:Ilibrary = {
        name:"",
        latitude:0,
        longitude:0,
        weekopen:0,
        weekclose:0,
        endopen:0,
        endclose:0,
        hompage:""
    }
    let { name, endclose, endopen, hompage, latitude,longitude, weekclose,weekopen } = yinform
    //let ninform
    let map:kakao.maps.Map;
    let isclicked = false
</script>
<main>
    <div class="lib-informs">
        <div class="library-container">
        <div class="title yes">-현재 대출 가능한 도서관-</div>
        {#each arr as i}
            <div class="library yes" on:click={()=>{
                isclicked = true
                name = i.name
                weekopen = i.weekopen
                weekclose = i.weekclose
                endopen = i.endopen
                endclose = i.endclose
                hompage = i.hompage
                latitude = i.latitude
                longitude = i.longitude
                map = new kakao.maps.Map(container, {
                    center:new kakao.maps.LatLng(latitude, longitude),
                    level:3
                })
            }}>{i.name}</div>
        {/each}
        </div>
        <div class="library-container">
            <div class="title no">-현재 대출 불가능한 도서관-</div>
            {#each brr as i}
                <div class="library no" on:click={()=>{
                    isclicked = true
                    name = i.name
                    weekopen = i.weekopen
                    weekclose = i.weekclose
                    endopen = i.endopen
                    endclose = i.endclose
                    hompage = i.hompage
                    latitude = i.latitude
                    longitude = i.longitude
                    map = new kakao.maps.Map(container, {
                        center:new kakao.maps.LatLng(latitude, longitude),
                        level:3
                    })
                }}>{i.name}</div>
            {/each}
        </div>
    </div>
    {#if isclicked === true}
        <div class="library-inform">
            <div>
                <div>{name}</div>
                <div>평일 운영 시간</div>
                <div>{weekopen}~{weekclose}</div>
                <div>휴일 운영 시간</div>
                <div>{endopen}~{endclose}</div>
                <div>홈페이지: {hompage}</div> 
            </div>
            <div style="height: 300px;" bind:this={container}></div>
        </div>
    {/if}
</main>
<style>
    main{
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .lib-informs {
        display: flex;
        flex-direction: column;
    }
    .library-container {
        background-color: #D9D9D9;
        width: 75vw;
        height: 45vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10px;
    }
    .title {
        color: white;
        border-radius: 25px;
        width: 300px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
    .library {
        width: 150px;
        color: white;
    }
    .library:hover {
        cursor: pointer;
    }

    .yes {
        background-color: #8894FF;
    }
    .no {
        background-color: #C388FF;
    }
    .library-inform {
        width: 30vw;
        height: 30vw;
        color: white;
    }
</style>