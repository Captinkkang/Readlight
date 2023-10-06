<script lang="ts">
    let clickmenu = 0;
    import Sidebar from "$lib/sidebar.svelte"
    import { goto } from '$app/navigation';
    import { fade, fly} from 'svelte/transition';
    import { isMenuOpen, islogin, my_id } from "$lib/stroe";
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button'
    import { onMount } from "svelte";
    import {
        GoogleAuthProvider,
        browserSessionPersistence,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
    } from 'firebase/auth'
    import type { User } from 'firebase/auth'
    import {
        getApps, 
        initializeApp, 
        FirebaseError
    } from 'firebase/app';
    import type { FirebaseOptions } from "firebase/app";
    import type { PageData } from "./$types";
    export let data:PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser:User|null = null;
    onMount(() =>{
        if(getApps().length === 0){
            //앱 배열정보가 0이면 앱을 하나 만들기
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        //유저의 인증 정보 가져오기, 정확히는 인증 상태
        const un = onAuthStateChanged(auth, user => {
            //인증 상태가 바뀔때 마다 user를 curuser에 넣는다
            curUser = user;
        });
        return un;
        //원래는 리턴 방식이 함수임
    })
    const login = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            //앱 있는지 없는지 확인
            initializeApp(firebaseConfig);
        }
        let id = prompt("이메일를 입력해 주세요","aaaaa@aaaaaa.com")
        let pw = prompt("6자리 비밀번호를 입력해 주세요")
        let obj = JSON.stringify({id:id, pw:pw})
        let check = await fetch(`/DB/User?user${obj}`)
        let json = await check.json()
        console.log(json, typeof id, typeof pw)
        if(json.answer === 0&&id !== null&&pw !== null){
            $my_id = id
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, id, pw)
            .then((userCredential) => {
                const user = userCredential.user;
            // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
        }else if(json.answer === 1&&id !== null&&pw !== null){
            console.log("ok 0")
            $my_id = id
            const auth = getAuth();
            signInWithEmailAndPassword(auth, id, pw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
        }
    }
    const logout = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        await auth.signOut();
        }
    let sign:HTMLDivElement;
</script>
{#if clickmenu%2 === 1}
    <div class="behind"></div>
{/if}
    <div id="top_bar">
        <div class="site_name">Readlight</div>
        <div class="button-wrapper">
            <div style="display: flex; align-items: center;" 
                on:mouseover={()=>{sign.style.display = "inline-block"}}
                on:mouseleave={()=>{sign.style.display = "none"}}>
                <IconButton class="material-icons">account_circle</IconButton>
                <div class="show" bind:this={sign}>
                    <div class="log-state">{curUser ? $my_id : '비로그인 중'}</div>
                    <div>
                        {#if curUser}
                            <button on:click={async ()=>{
                                logout(firebaseConfig)
                                $islogin = false
                            }}>로그아웃</button>
                        {:else}
                            <button on:click={async ()=>{
                                login(firebaseConfig)
                                $my_id = ""
                                $islogin = true
                            }}>로그인 또는 화원가입</button>
                        {/if}
                    </div>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <IconButton class="material-icons" on:click={() => goto('/')}>home</IconButton>
            </div>
            <div style="display: flex; align-items: center;">
                <IconButton class="material-icons" on:click={() => $isMenuOpen = true}>menu</IconButton>
            </div>
            <Sidebar />
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
        z-index: 3;
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

    .behind {
        background-color: black;
        width: 100%;
        height: 100%;
        opacity: 0%;
    }
    
    .button-wrapper {
        display: flex;
    }
    .show {
        background-color: gray;
        display: none;
        position: absolute;
        top: 60px;
    }
    .log-state {
        color: white;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: lavenderblush;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: lavender;
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: lightsteelblue;
    }
    ::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
</style>