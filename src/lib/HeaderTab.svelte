<script lang="ts">
    // Import navigation function
    import { goto } from '$app/navigation';
    // Import current page store
    import { page } from '$app/stores';
    // Import Colour Inverter function
    import { tab, invertColor } from '$lib/stores';
    // Import Component Attributes
    export let title: string, color: string, url: string, id: string;
</script>

<!-- Tab button in header, text colour derived from b/w of background colour -->
<button class="rounded-xl lg:rounded-b-none min-w-fit self-end flex-1 lg:h-12 p-2 px-10 lg:ml-4 font-bold {$page.url.pathname == url || $tab == id ? 'shadow-inner' : ''}" style="background-color: {$page.url.pathname == url || $tab == id ? color : 'rgb(231, 235, 239)'}; color: {$page.url.pathname == url || $tab == id ? invertColor(color) : '#000000'};" on:click={() => {
    goto(url);
}}>{title}</button>

<style>
    
</style>

