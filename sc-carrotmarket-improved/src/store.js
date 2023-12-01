import { writable } from "svelte/store";


//다른 파일에서 쓸 거니까 export
export const user$ = writable(null);