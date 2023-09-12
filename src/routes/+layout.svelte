<script lang="ts">
    let clickmenu = 0;
    import Sidebar from "$lib/sidebar.svelte"
    import { goto } from '$app/navigation';
    import { fade, fly} from 'svelte/transition';
    import { isMenuOpen, islogin } from "$lib/stroe";
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button'
    import { onMount } from "svelte";
    import {
        GoogleAuthProvider,
        browserSessionPersistence,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup
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
        const provider = new GoogleAuthProvider();//프로바이더 만들기
        const auth = getAuth();//어스 정보
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');//구글이 사용하는 정보들, 어디까지 받을껀지
        try{//안쪽에서 오류나면 catch(error)~~부분으로
            await setPersistence(auth, browserSessionPersistence);//로그인 정보를 어디다 저장할지
            const result = await signInWithPopup(auth, provider);//프로바이더가 바뀔때마다 다르게 뜸
            const credential = GoogleAuthProvider.credentialFromResult(result);//정보를 해석 매서드로 해석해서 알아냄
            const token = credential?.accessToken;//토큰, 아이디를 의미, firebase에서 정보를 알 수가 있음
            const user = result.user;//유저를 받는다
            return { token , user};
        } catch(error){
            if(error instanceof FirebaseError){//파이어베이스 내에서 일어난 에러를 캐치, 나머지는 그냥 넘기기
                const code = error.code;
                const message = error.message;
                // The email of the user's account used.
                const email = error.customData?.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({
                    code, message, email, credential
                });
            } else {
                console.log(error);
            }
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
                    <div class="log-state">{curUser ? '로그인 중' : '비로그인 중'}</div>
                    <div>
                        <button on:click={async ()=>{
                            login(firebaseConfig)
                            let auth = getAuth();
                            let user = auth.currentUser;
                            let mail = user?.email;
                            let res = await fetch(`/DB?user=${user}&mail=${mail}`)
                            let json = res.json()
                            if(JSON.stringify(json) === "ok"){
                                //islogin = true
                            }

                        }}>로그인</button>
                        <button on:click={()=>{logout(firebaseConfig)}}>로그아웃</button>
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