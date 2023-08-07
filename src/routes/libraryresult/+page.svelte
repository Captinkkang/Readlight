<script lang="ts">
    import { onMount } from "svelte";
    import Button from "@smui/button";
    import { goto } from "$app/navigation";
    import IconButton from "@smui/icon-button";

    interface Ilibrary {
        name: string;
        weekopen: number;
        weekclose: number;
        endopen: number;
        endclose: number;
        hompage: string;
        post:string
        phone:string
        latitude: number;
        longitude: number;
    }
    let container: HTMLDivElement;
    let arr: Ilibrary[] = [
        {
            name: "안산 중앙 도서관",
            weekopen: 0,
            weekclose: 24,
            endopen: 0,
            endclose: 24,
            hompage: "https://naver.com",
            post:"안산천남로245",
            phone:"010-7392-1337",
            latitude: 37.3044,
            longitude: 126.8212,
        },
        {
            name: "안산미디어라이브러리",
            weekopen: 0,
            weekclose: 0,
            endopen: 24,
            endclose: 24,
            hompage: `https://google.com`,
            post:"안산천남로245",
            phone:"010-7392-1337",
            latitude: 37.307218997374,
            longitude: 126.83132540949,
        },
    ];
    let brr: Ilibrary[] = [
        {
            name: "안산 관산 도서관",
            weekopen: 0,
            weekclose: 24,
            endopen: 0,
            endclose: 24,
            hompage: "https://daum.com",
            post:"안산천남로245",
            phone:"010-7392-1337",
            latitude: 37.332043787469,
            longitude: 126.79959076287,
        },
    ];
    let yinform: Ilibrary = {
        name: "",
        latitude: 37.526359155559,
        longitude: 126.93352258617,
        weekopen: 0,
        weekclose: 0,
        endopen: 0,
        endclose: 0,
        hompage: "",
        post:"",
        phone:""
    };
    let info = yinform;
    //let ninform
    let map: kakao.maps.Map;
    onMount(() => {
        console.log(container)
        map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(
                info.latitude,
                info.longitude
            ),
            level: 3,
        });
    })
</script>

<main>
    <div class="lib-informs">
        <div class="library-container">
            <div class="title yes">-현재 대출 가능한 도서관-</div>
            <div class="libraries">
                {#each arr as i}
                    <Button
                        variant="raised" 
                        class="button-shaped-round"
                        style="border-radious: 20px;"
                        on:click={() => {
                            info = i
                            map.setCenter(new kakao.maps.LatLng(info.latitude, info.longitude));
                            map.relayout();
                        }}>{i.name}</Button
                    >
                {/each}
            </div>
        </div>
        <div class="library-container">
            <div class="title no">-현재 대출 불가능한 도서관-</div>
            <div class="libraries">
                {#each brr as i}
                    <Button
                        variant="raised" 
                        class="button-shaped-round"
                        on:click={() => {
                            info = i
                            map.setCenter(new kakao.maps.LatLng(info.latitude, info.longitude));
                            map.relayout();
                        }}>{i.name}</Button
                    >
                {/each}
            </div>
        </div>
    </div>
    <div class="library-inform" style={info.name ? "" : "visibility:hidden;"}>
        <div class="text">
            <div class="name">{info.name} <span class="blue" on:click={()=>{goto(info.hompage)}}></span></div>
            <div>{info.post}</div>
            <div class="phone">{info.phone}</div>
            <div>평일 운영 시간: <span>{info.weekopen}~{info.weekclose}</span></div>
            <div>휴일 운영 시간: <span>{info.endopen}~{info.endclose}</span></div>
        </div>
        <div style="height: 300px; width: 300px;" bind:this={container} />
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

    .lib-informs {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
    .library-container {
        background-color: #d9d9d9;
        width: 50vw;
        height: 42vh;
        display: flex;
        flex-direction: column;
        /*justify-content: space-between;*/
        margin-top: 10px;
    }
    .library-container > div {
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
    .libraries {
        display: flex;
        justify-content: space-evenly;
        overflow: auto;
    }
    .library {
        width: 150px;
        color: white;
    }
    .library:hover {
        cursor: pointer;
    }

    .yes {
        background-color: #8894ff;
    }
    .no {
        background-color: #c388ff;
    }
    .library-inform {
        width: 30vw;
        height: 30vw;
        color: white;
        display: flex;

    }
    .text {
        background-color: black;
        height: 300px;
    }
    .name {
        font-size: 20px;
    }
    .blue {
        background-image: url("/bluearrow.svg");
    }
    .phone {
        color: lightgreen;
    }
</style>
