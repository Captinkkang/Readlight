<script lang="ts">
    import { onMount } from "svelte";
    interface Ibooks {
        subject: string | undefined;
        title: string | undefined;
        fulltitle: string;
        writer: string | undefined;
        publish: string | undefined;
        thumnail: string | undefined;
        coment: string;
        view: number;
        favorite: number;
        number: number;
    }
    
    let brr: Ibooks[] = [];
    let ready = false;
    onMount(async () => {
        let lbook = await fetch(`/DB/rank`);
        let json = await lbook.json();
        let binfo = await fetch(
            `/bookrecommand/api2?arr=${JSON.stringify(json)}`
        );
        let bson = await binfo.json();
        brr = bson;
        ready = true;
    });

    let loveit: number[] = [];
</script>
<main>
    {#if ready === true}
        <div class="con">
            <div class="libraries background">
                <div class="title">readlight 사용자 추천 도서</div>
                <div class="book-list">
                    <span />
                    <div class="books">
                        {#each brr as { title, writer, publish, thumnail, coment, view, favorite, number }}
                            <div
                                class="book"
                                on:contextmenu={(e) => {
                                    e.preventDefault();
                                    view++;
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
                                            bind:group={loveit}
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
        margin-top: 10px;
        overflow: auto;
    }
    .books {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
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