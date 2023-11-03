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

    let arr: Ibooks[] = [];
    let brr: Ibooks[] = [];
    let ready = false;
    onMount(async () => {

        const now = new Date();
        const year = now.getFullYear();
        let mon = now.getMonth() + 1;
        let da = now.getDate();
        let month;
        let day;

        if (mon < 10) month = `0${mon}`;
        else month = mon;
        if (da < 10) day = `0${da}`;
        else day = da;
        let date = `${year}${month}${day}`;

        let agoyear = year;
        const res = await fetch(
            `/bookrecommand/api?ago=${agoyear}&date=${date}`
        );
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        let list = xml.querySelectorAll("list");
        for (let i = 0; i < list.length; i++) {
            let insert = {
                subject: list[i]
                    .querySelector("item")
                    ?.querySelector("drCodeName")?.innerHTML,
                title: list[i]
                    .querySelector("item")
                    ?.querySelector("recomtitle")?.innerHTML,
                fulltitle: "",
                writer: list[i]
                    .querySelector("item")
                    ?.querySelector("recomauthor")?.innerHTML,
                publish: list[i]
                    .querySelector("item")
                    ?.querySelector("recompublisher")?.innerHTML,
                thumnail: list[i]
                    .querySelector("item")
                    ?.querySelector("recomfilepath")?.innerHTML,
                coment: "",
                view: 0,
                favorite: 0,
                number: 0,
            };
            arr.push(insert);
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i].number = i + 1;
        }
        ready = true;
    });

    let loveit: number[] = [];
    /*
        장르별 분류가능
        제목 11텍스트 이상 줄이기
        도서 overflow처리
    */
</script>

<main>
    {#if ready === true}
        <div class="con">
            <div class="librarian background">
                <div class="title">사서 추천 도서</div>
                <div class="book-list">
                    <span />
                    <div class="books">
                        {#each arr as { title, writer, publish, thumnail, coment, view, favorite, number }}
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
