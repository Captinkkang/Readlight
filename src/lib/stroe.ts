import { writable } from "svelte/store";
export const isMenuOpen = writable(false);
export let islogin = writable(false);
export let my_id = writable("");
export let binfo = writable({"title":"string", "writer":"string", "url":"string", "class":"string", "description":"string", "date":"string", "publisher":"string"});