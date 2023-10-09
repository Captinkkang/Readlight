<script lang="ts">
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import IconButton from "@smui/icon-button";
    let inp: String;
    const movenext = () => {
        if (inp !== "") goto("/selectbook");
    };
</script>

<main transition:fly={{ y: -200 }}>
    <div id="content">
        <div id="inputWrapper">
            <div class="title">Readlight</div>
            <div id="input">
                <div style="display: flex; align-items: center;" class="button">
                    <IconButton
                        class="material-icons"
                        on:click={async () => {
                        const fetchtemp = await fetch(`/server?keyword=${inp}`);
                        let res = await fetchtemp.json();
                        console.log(res)
                        let arr = [];
                        for (let i = 0; i < res.response.docs.length; i++) {
                            let insert = {
                                title: res.response.docs[i].doc.bookname,
                                fulltitle: "",
                                publish: res.response.docs[i].doc.publisher,
                                coment: "",
                                writer: res.response.docs[i].doc.authors,
                                thumnail: res.response.docs[i].doc.bookImageURL,
                                isbn13: res.response.docs[i].doc.isbn13,
                                view: 0,
                                favorite: 0,
                                favorite_click: 0,
                                number: i,
                                full: false,
                                full2: false
                            };
                            arr.push(insert);
                        }
                        localStorage.setItem(
                            "selectbook",
                            JSON.stringify(arr)
                        );
                        movenext()
                    }}>search</IconButton
                    >
                </div>
                <input
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    role="combobox"
                    aria-controls="matches"
                    placeholder=" 도서 검색"
                    aria-expanded="false"
                    aria-live="polite"
                    bind:value={inp}
                    on:keydown={async (e) => {
                        if (e.key !== "Enter") return;
                        const fetchtemp = await fetch(`/server?keyword=${inp}`);
                        let res = await fetchtemp.json();
                        let arr = [];
                        for (let i = 0; i < res.response.docs.length; i++) {
                            let insert = {
                                title: res.response.docs[i].doc.bookname,
                                fulltitle: "",
                                publish: res.response.docs[i].doc.publisher,
                                coment: "",
                                writer: res.response.docs[i].doc.authors,
                                fullwriter: "",
                                thumnail: res.response.docs[i].doc.bookImageURL,
                                isbn13: res.response.docs[i].doc.isbn13,
                                view: 0,
                                favorite: 0,
                                favorite_click: 0,
                                number: i
                            };
                            arr.push(insert);
                        }
                        localStorage.setItem(
                            "selectbook",
                            JSON.stringify(arr)
                        );
                        movenext()
                    }}
                />
            </div>
        </div>
    </div>
</main>

<style>
    main {
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
    }
    #content {
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
        background-color: #2b2930;
        width: 100%;
        max-width: 500px;
        margin: 0 10px;
        box-sizing: border-box;
        height: 50px;
        border-radius: 25px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: inset 2px -2px 3px;
    }
    #input > input {
        background-color: inherit;
        outline: none;
        border: none;
        height: 100%;
        flex-grow: 1;
        box-sizing: border-box;
        color: white;
    }

    .title {
        color: white;
        font-size: 64px;
        width: 40vw;
        text-align: center;
        margin-bottom: 20px;
        /* height: ; */
    }

    .button {
        color: white;
        margin-right: 25px;
        box-sizing: border-box;
        border: none;
        height: 100%;
        width: 30px;
        background-color: inherit;
        background-size: 120%;
        background-position: center;
    }
</style>
