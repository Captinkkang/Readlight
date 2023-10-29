<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { isMenuOpen } from "./stroe";
    import { fly } from "svelte/transition";
    import Button from '@smui/button';
    import Fab from '@smui/fab';
    import IconButton from '@smui/icon-button';
    import { goto } from "$app/navigation";
    import { binfo } from "$lib/stroe";
    let book: { title: string; writer?: string; url?: string; class?: string; description?: string; date?: string; publisher?: string; };
    /*
    <div class="modified-book">
            <div class="book">
                <div class="title">{$binfo.title}</div>
                <div class="book-img">
                    <img src="{$binfo.url}" alt="press F5">
                </div>
                <div class="janrue">{$binfo.class}</div>
                <div class="writer">{$binfo.writer}</div>
                <div class="coment">{$binfo.description}</div>
                <div class="publish">{$binfo.publisher}</div>
            </div>
        </div>
    */
</script>
{#if $isMenuOpen}
    <div class="side_content" transition:fly={{x : 300, duration:500}}>
        <div style="display: flex; align-items: center;" class="remove">
            <IconButton class="material-icons" on:click={() => $isMenuOpen = false}
              >remove</IconButton
            >
        </div>
        <div class="button-container">
                <Button
                color="secondary" 
                class="menu" 
                variant="raised"
                style="margin-top: 20px; width: 90%;"
                on:click={()=>{
                    goto('/bookrecommand')
                    $isMenuOpen = false
                }}>
                    추천/인기 도서
                </Button>
                <Button class="menu" 
                color="secondary" 
                variant="raised" 
                style=" margin-top: 20px;width: 90%;"
                on:click={()=>{
                    goto('/publishingbook')
                    $isMenuOpen = false
                }}>
                    출판 예정 도서
                </Button>
                <Button class="menu" 
                color="secondary" 
                variant="raised" 
                style=" margin-top: 20px;width: 90%;"
                on:click={()=>{
                    goto('/bookrank')
                    $isMenuOpen = false
                }}>
                    사용자 추천 도서
                </Button>
        </div>
        
    </div>
{/if}

<style>
    .remove {
        margin-left: 250px;
        margin-top: 5px;
    }
    .button-container{
        display: flex;
        flex-direction: column;
        align-items:end;
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


</style>