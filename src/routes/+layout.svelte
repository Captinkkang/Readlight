<script lang="ts">
    let clickmenu = 0;
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import Sidebar from "$lib/sidebar.svelte"
    import { goto } from '$app/navigation';
    

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>
{#if clickmenu%2 === 1}
    <div class="behind"></div>
{/if}
    <div id="top_bar">
        <div class="site_name">Readlight</div>
        <div class="button-wrapper">
            <button class="home" on:click={() => goto('/main-page')}></button>
            {#if clickmenu%2 !== 1}
                <button class="menu" on:click={() => clickmenu++}></button>
            {/if}
            {#if clickmenu%2 === 1}
                <Sidebar on:exit={() => clickmenu++}/>
            {/if}
        </div>
    </div>
    <slot />
    <div id="bt_bar"></div>

<style>
    #top_bar {
        background-color: #424242;
        height: 60px;
        display: flex;
        justify-content: space-between;
        
    }
    #bt_bar {
        background-color: #424242;
        width: 100vw;
        height: 40px;
    }

    .side_bar {
        background-color: #536E8E;
        width: 25vw;
        height: calc(100vh - 100px);
    }
    .content {
        background-color: #D9D9D9;
        height: 5vw;
        margin-bottom: 20px;
    }

    .site_name {
        color: white;
        background-color: #586C83;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
    }
    .menu {
        width: 60px;
        background-image: url(/menu.svg);
        
        border:none;
        background-color: inherit;
        transition: 0.5s;
    }
    .menu:hover {
        cursor: pointer;
        background-color: #eee;
    }

    .behind {
        background-color: black;
        width: 100%;
        height: 100%;
        opacity: 0%;
    }
    .home {
        background-image: url(/home.svg);
        border: none;
        background-color: inherit;
        background-repeat: no-repeat;
        background-position: 10px, 1px;
        background-size: auto;
        width: 60px;
        transition: 0.5s;
    }
    .home:hover {
        cursor: pointer;
        background-color: #eee;

    }

    .button-wrapper {
        display: flex;
    }
</style>