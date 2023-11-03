<script lang="ts">
    import { onMount } from "svelte";
    interface Ibooks {
        subject: string;
        title: string;
        fulltitle: string;
        writer: string;
        fullwriter: string;
        publish: string;
        thumnail: string ;
        coment: string;
        fullcoment: string;
        view: number;
        favorite: number;
        number: number;
        isbn13: string;
        class_nm: string;
        all_rank: string;
        region_rank: string;
        age_rank: string;
    }

    let brr: Ibooks[] = [];
    let ready = false;
    let info = false
    
    onMount(async () => {
        let lbook = await fetch(`/DB/rank`);
        let json = await lbook.json();
        let binfo = await fetch(
            `/bookrecommand/api2?arr=${JSON.stringify(json)}`
        );
        let bson = await binfo.json();
        brr = bson;
        for(let i=0; i<brr.length; i++){
            brr[i].fulltitle = brr[i].title;
            if (brr[i].title.length > 11) {
                brr[i].title = brr[i].title.slice(0, 11);
            }
            brr[i].fullwriter = brr[i].writer;
            if (brr[i].writer.length > 11) {
                brr[i].writer = brr[i].writer.slice(0, 11);
            }
        }
        ready = true;
    });

    let loveit: number[] = [];
    let inform = {
        "title":"title",
        "img":"img",
        "class":"class",
        "rank":{"all":"all","region":"region","age":"age"},
        "writer":"writer",
        "publihser":"publisher",
        "coment":"coment"
    }
</script>
<main>
    {#if info === true}
        <div class="binfo">
            <div>{inform.title}</div>
            <div>
                <div>{inform.img}</div>
                <div>{inform.class}</div>
                <div>{inform.rank}</div>
            </div>
            <div>
                <div>{inform.writer}</div>
                <div>{inform.publihser}</div>
                <div>{inform.coment}</div>
            </div>
        </div>
    {/if}
    {#if ready === true}
        <div class="con">
            <div class="libraries background">
                <div class="title">readlight 사용자 추천 도서</div>
                <div class="book-list">
                    <span />
                    <div class="books">
                        {#each brr as { title, writer, publish, thumnail, coment, view, favorite, number, isbn13, class_nm, region_rank, age_rank, all_rank, fulltitle, fullcoment, fullwriter }}
                            <div
                                class="book"
                                on:contextmenu={(e) => {
                                    e.preventDefault();
                                    view++;
                                    inform = {
                                        "title":fulltitle,
                                        "img":thumnail,
                                        "class":class_nm,
                                        "rank":{"all":all_rank,"region":region_rank,"age":age_rank},
                                        "writer":fullwriter,
                                        "publihser":publish,
                                        "coment":fullcoment
                                    }
                                    info = true
                                }}
                            >
                                <div class="content">
                                    <div class="title">
                                        <span style="color: white;">.</span
                                        >{title}
                                    </div>
                                    <div class="book-image">
                                        <img src={thumnail} alt="press F5" />
                                    </div>
                                    <div class="writer">
                                        <span style="color: white;">.</span
                                        >{writer}
                                        저
                                    </div>
                                    <div class="coment">
                                        <span style="color: white;">.</span
                                        >-{coment}
                                    </div>
                                    <div class="publish">{publish}</div>
                                </div>
                                <div class="loveit">
                                    <span class="eye">
                                        <img
                                            src="./eye2.svg"
                                            alt="press F5"
                                        />{view}
                                    </span>
                                    <span class="heart">
                                        <input
                                            type="checkbox"
                                            id="inp{number}"
                                            value={number}
                                        />
                                        <label
                                            class="img"
                                            for="inp{number}"
                                        />{favorite}
                                    </span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
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
        height: 65vh;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
    }
    .book-list {
        margin-top: 30px;
        overflow: auto;
    }
    .books {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
    }

    .book {
        margin-top: 20px;
        margin-left: 40px;
        width: 13vw;
        height: 58vh;
        background-color: white;
        box-shadow: 2px 0px 5px 0px;
        border-radius: 5px;
        transition: 0.5s;
    }
    .title {
        font-weight: bold;
        width: 96%;
        border-bottom: 2px solid rgba(46, 16, 0, 0.819);
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
        padding-bottom: 3vh;
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
    .heart > input {
        width: 15px;
        height: 15px;
    }
    .book:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 1px 1px 5px 0px;
    }
    .book-image {
        width: 100%;
    }
    /*input[type="checkbox"] {
        background-image: url("/Readlight/static/heart.svg");
    }
    input[type="checkbox"]:checked + label {
        background-image: url("/Readlight/static/filledheart.svg");
    }*/
</style>