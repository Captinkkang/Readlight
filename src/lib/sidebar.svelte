<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { isMenuOpen } from "./stroe";
    import { fly } from "svelte/transition";
</script>
{#if $isMenuOpen}
    <div class="side_content" transition:fly={{x : 300, duration:500}}>
        <div class="button-container">
            <button on:click={() => $isMenuOpen = false}></button>
        </div>
        <div class="menu">추천/인기 도서</div>
        <div class="menu">출판 예정 도서</div>
    </div>
{/if}

<style>
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
    .side_content {
        position:fixed;
        right:0;
        top:0;
        background-color: #536E8E;
        width: 300px;
        height: 100vh;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        z-index: 2;
    }

    .menu {
        background-color: #D9D9D9;
        height: 5vw;
        margin-bottom: 20px;
        text-align: right;
        font-size: 22px;
        align-items: center;
    }

    button {
        background-image: url(/Xmenu.svg);
        width: 3vw;
        height: 3vw;
        margin-bottom: 20px;
        margin-top: 10px;
        background-color: inherit;
        border: none;
        border-radius: 25px;
        background-position: 15px ,5px;
        background-repeat: no-repeat;
        transition:background 0.5s;
    }
    button:hover{
        cursor: pointer;
        background-color: #D9D9D9;
    }
</style>