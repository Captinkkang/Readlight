<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import IconButton from "@smui/icon-button";
    import Button, {Label} from "@smui/button";

    let drr:[string[]] = [['']]
    let regions:String[] = [];//기본
    let useful:String[]=[];//태그를 바꿀 기본의 복제형
    let ready = false
    //let ready = false;
    onMount(async ()=>{
        const res = await fetch('/20201029_.csv')
        const csv = await res.text()
        let brr = csv.split("\n")
        brr.splice(0,2)
        for(let i=0; i<brr.length; i++){
            let crr = brr[i].split(",")
            crr.splice(5,2)
            crr.splice(1,1)
            crr[1] = crr[1]+crr[2]
            crr.splice(2,1)
            drr.push(crr);
        }
        drr.shift()
        //console.log(drr)
        let sum = []
        for(let i=0; i<drr.length; i++){
            sum.push(drr[i][1])
        }
        for(let i of sum) {
            if (!regions.includes(i)) regions.push(i);
        }
        regions.pop()
        useful = regions
        ready = true
    })
    
    let value:string;//안쓸 수도 있음
    let checked:string[]=[];
    /*
    방법1: 클릭할때 체크
    방법2: 클릭다 하고 체크
    */
</script>
<main>
    <div class="input-wrapper">
        <div id="input">
            <div style="display: flex; align-items: center;" class="button">
                <IconButton class="material-icons">search</IconButton>
            </div>
            <input 
                type="text" 
                autocomplete="off" 
                spellcheck="false" 
                role="combobox" 
                aria-controls="matches" 
                placeholder=" 지역 검색" 
                aria-expanded="false" 
                aria-live="polite" 
                bind:value={value} 
                on:input={()=>{
                    ready = false
                    useful = regions.filter(v => v.indexOf(value) !== -1)
                    ready = true
                }}
            >
        </div>
        <Button color="secondary" variant="raised" on:click={()=>{
            console.log('result',checked)
            if(checked.length > 0)goto('/libraryresult')
            else alert("지역을 1개 이상 선택해 주세요.")
            
            }}
        >
            <Label>선택 완료</Label>
        </Button>
    </div>
    <div class="main-container">
        <div class="text">검색에 포함될 지역을 선택해 주세요</div>
        <div class="region-container">
            {#if ready === true}
                {#each useful as i}
                    <div class="check-container">
                        <input type="checkbox" id="inp{i}" value="{i}" bind:group={checked}>
                        <label class="check-container" for="inp{i}">{i}</label>
                    </div>
                {/each}
            {/if}
                
        </div>
    </div>
</main>
<style>
    main{
        height: calc(100vh - 100px);
        background-image: url("https://a-static.besthdwallpaper.com/hogwarts-library-wallpaper-1280x800-81797_3.jpg");
        background-size: cover;
        background-position: bottom;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input[type="checkbox"] {
        display: none;
    }
    input[type="checkbox"]:checked + label {
        background-color: pink;
        color: black;
    }
    #input {
        position: relative;
        background-color: #2B2930;
        width: 40vw;
        max-width: 500px;
        margin:0 10px;
        box-sizing: border-box;
        height: 50px;
        border-radius: 25px;
        padding:10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .input-wrapper {
        display: flex;
        justify-content: space-between;
        margin-left: 40px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    #input > input{
        background-color: inherit;
        outline: none;
        border: none;
        height:100%;
        flex-grow: 1;
        box-sizing: border-box;
        color:white;
    }

    .main-container {
        background-color: #D9D9D9;
        filter: opacity(90%);
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 1190px;
        height: 90vh;
        overflow: auto;
    }
    .text {
        font-size: 20px;
        width: 1100px;
        text-align: center;
        border-bottom: 2px solid black;
        margin-bottom: 5px;
    }
    .region-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .check-container {
        display: flex;
        width: 10vw;
        height: 60px;
        border-radius: 20px;
        background-color: #5E5D87;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        color: white;
        border: none;
    }
    .check-container > label {
        text-align: center;
    }
    .check-container:hover {
        cursor: pointer;
    }
    .button {
        color: white;
        margin-right: 25px;
        box-sizing: border-box;
        border:none;
        height: 100%;
        width:30px;
        background-color: inherit;
        background-size: 120%;
        background-position: center;
    }
</style>