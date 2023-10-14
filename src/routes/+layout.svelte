<script lang="ts">
    let clickmenu = 0;
    import Sidebar from "$lib/sidebar.svelte";
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import { isMenuOpen, islogin, my_id } from "$lib/stroe";
    import IconButton from "@smui/icon-button";
    import Button from "@smui/button";
    import { onMount } from "svelte";
    import {
        GoogleAuthProvider,
        browserSessionPersistence,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";
    import type { User } from "firebase/auth";
    import { getApps, initializeApp, FirebaseError } from "firebase/app";
    import type { FirebaseOptions } from "firebase/app";
    import type { PageData } from "./$types";
    export let data: PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null;
    onMount(() => {
        if(curUser !== null&&curUser.email !== null){
            let arr = curUser.email.split("");
            let num = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "@") {
                    num = i;
                    break;
                }
            }
            arr.splice(num, arr.length - num);
            $my_id = arr.join();
        }
        if (getApps().length === 0) {
            //앱 배열정보가 0이면 앱을 하나 만들기
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        //유저의 인증 정보 가져오기, 정확히는 인증 상태
        const un = onAuthStateChanged(auth, (user) => {
            //인증 상태가 바뀔때 마다 user를 curuser에 넣는다
            curUser = user;
        });
        return un;
        //원래는 리턴 방식이 함수임
    });
    const login = async (firebaseConfig: FirebaseOptions) => {
        if (getApps().length === 0) {
            //앱 있는지 없는지 확인
            initializeApp(firebaseConfig);
        }
        let id = prompt("이메일를 입력해 주세요", "aaaaa@aaaaaa.com");
        let pw = prompt("6자리 비밀번호를 입력해 주세요");

        let check = await fetch(`/DB/User?id=${id}&pw=${pw}`);
        let json = await check.json();
        if (json.answer === 0 && id !== null && pw !== null) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, id, pw)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if(id !== null){
                        let arr = id.split("");
                        let num = 0;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] === "@") {
                                num = i;
                                break;
                            }
                        }
                        arr.splice(num, arr.length - num);
                        $my_id = arr.join();
                        $islogin = true;
                        alert(`로그인 성공! ${$my_id}님 환영합니다.`);
                    }
                    // ...
                })
                .catch((error) => {
                    const problem = (a: any) => {
                        switch (a) {
                            case "auth/user-not-found" || "auth/wrong-password":
                                return "이메일 혹은 비밀번호가 일치하지 않습니다.";
                            case "auth/email-already-in-use":
                                return "이미 사용 중인 이메일입니다.";
                            case "auth/weak-password":
                                return "비밀번호는 6글자 이상이어야 합니다.";
                            case "auth/network-request-failed":
                                return "네트워크 연결에 실패 하였습니다.";
                            case "auth/invalid-email":
                                return "잘못된 이메일 형식입니다.";
                            case "auth/internal-error":
                                return "잘못된 요청입니다.";
                            default:
                                return "로그인에 실패 하였습니다.";
                        }
                    };

                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(problem(errorCode));
                    // ..
                });
        } else if (json.answer === 1 && id !== null && pw !== null) {
            
            const auth = getAuth();
            signInWithEmailAndPassword(auth, id, pw)
                .then((userCredential) => {
                    // Signed in
                    if(id !== null){
                        let arr = id.split("");
                        let num = 0;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] === "@") {
                                num = i;
                                break;
                            }
                        }
                        arr.splice(num, arr.length - num);
                        $my_id = arr.join("");
                        const user = userCredential.user;
                        console.log(user);
                        $islogin = true;
                        alert(`로그인 성공! ${$my_id}님 환영합니다.`);
                    }
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    };
    const logout = async (firebaseConfig: FirebaseOptions) => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        await auth.signOut();
        $islogin = false;
    };
    let sign: HTMLDivElement;
</script>

{#if clickmenu % 2 === 1}
    <div class="behind" />
{/if}
<div id="top_bar">
    <div class="site_name">Readlight</div>
    <div class="button-wrapper">
        <div
            style="display: flex; align-items: center;"
            on:mouseover={() => {
                sign.style.display = "inline-block";
            }}
            on:focus={() => {}}
            on:mouseleave={() => {
                sign.style.display = "none";
            }}
        >
            <IconButton class="material-icons">account_circle</IconButton>
            <div class="show" bind:this={sign}>
                <div class="log-state">
                    {curUser ? `${$my_id}님` : "비로그인 중"}
                </div>
                <div>
                    {#if curUser}
                        <button
                            on:click={async () => {
                                logout(firebaseConfig);
                                if($islogin === false)location.reload()
                            }}>로그아웃</button
                        >
                    {:else}
                        <button
                            on:click={async () => {
                                login(firebaseConfig);
                                if($islogin === true)location.reload()
                            }}>로그인 또는 화원가입</button
                        >
                    {/if}
                </div>
            </div>
        </div>
        <div style="display: flex; align-items: center;">
            <IconButton class="material-icons" on:click={() => goto("/")}
                >home</IconButton
            >
        </div>
        <div style="display: flex; align-items: center;">
            <IconButton
                class="material-icons"
                on:click={() => ($isMenuOpen = true)}>menu</IconButton
            >
        </div>
        <Sidebar />
    </div>
</div>
<slot />
<div id="bt_bar" />

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
        background-color: #586c83;
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
