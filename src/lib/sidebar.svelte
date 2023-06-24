<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const Xsidebar = () =>{
        dispatch('exit')
    }
</script>
<div class="side_content">
    <div class="button-container">
        <button on:click={Xsidebar}></button>
    </div>
    <div class="menu">추천/인기 도서</div>
    <div class="menu">출판 예정 도서</div>
</div>

<style>
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
    .side_content {
        background-color: #536E8E;
        width: 25vw;
        height: calc(100vh - 40px);
        border-radius: 20px;
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
        transition: 0.5s;
    }
    button:hover{
        cursor: pointer;
        background-color: #D9D9D9;
    }
</style>