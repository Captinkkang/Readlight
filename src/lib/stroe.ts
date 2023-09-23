import { writable } from "svelte/store";
export const isMenuOpen = writable(false);
export let islogin = writable(false);
export let my_id = writable("");