<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { invertColor } from '$lib/stores';
    export let title: string, color: string, url: string;
</script>

<button class="rounded-t-xl min-w-fit self-end flex-1 h-12 p-2 px-10 ml-4 font-bold {$page.url.pathname == url ? 'shadow-inner' : ''}" style="background-color: {$page.url.pathname == url ? 'rgb(241, 245, 249)' : color}; color: {$page.url.pathname == url ? '#000000' : invertColor(color)};" on:click={() => {
    goto(url);
}}>{title}</button>
<!-- <a class="rounded-t-xl min-w-fit self-end flex-1 h-12 p-2 px-10 ml-4 font-bold {$page.url.pathname == url ? 'shadow-inner' : ''}" style="background-color: {$page.url.pathname == url ? 'rgb(241, 245, 249)' : color}; color: {$page.url.pathname == url ? '#000000' : invertColor(color)};" href={url}>{title}</a> -->

<style>
    
</style>

