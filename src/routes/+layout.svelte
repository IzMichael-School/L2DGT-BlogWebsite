<script lang="ts">
    import HeaderTab from '../lib/HeaderTab.svelte';

    import '../app.css';
    import '../fonts.css';

    import { fade } from 'svelte/transition';
    import { darkmode } from '$lib/stores';
    import type { Category } from '$lib/types';
    export let data: {
        categories: Category[]
    };
</script>

<div class="flex flex-col justify-center items-center w-screen h-screen max-h-screen overflow-hidden">
    <div id="header" class="flex flex-row justify-start items-center w-full h-16 bg-slate-100 pr-4">
        <button class="w-16 h-16 aspect-square mr-2 relative border-r-2 border-gray-200" on:click={() => $darkmode = !$darkmode}>
            {#if $darkmode}
                <img src="/assets/icons/moon.svg" transition:fade class="h-8 w-8 m-4 aspect-square absolute inset-0" alt="Moon Icon" />
            {:else}
                <img src="/assets/icons/sun.svg" transition:fade class="h-8 w-8 m-4 aspect-square absolute inset-0" alt="Sun Icon" />
            {/if}
        </button>
        
        <img src="/favicon.png" class="h-12 w-12 aspect-square rounded-lg" alt="Favicon" />
        <h1 class="text-4xl ml-4 font-bold mr-10">Iz's DevLog DevBlog</h1>

        <HeaderTab title="Home" color="#3b82f6" url="/" />
        {#each (data.categories ?? []) as category}
            <HeaderTab title={category.name} color={category.color} url="/c/{category.path}" />
        {/each}
    </div>
    <div class="flex flex-row justify-center items-center w-full flex-1 max-h-full overflow-hidden">
        <div id="sidebar" class="flex flex-col justify-between items-center h-full w-16 bg-slate-100 border-r-2 border-gray-200">
            <button class="p-2 aspect-square w-16 h-16">
                <img src="/assets/icons/arrow.svg" class="w-full h-full aspect-square" title="Scroll to Top" alt="Arrow Pointing Up" />
            </button>

            <button class="p-2 aspect-square w-16 h-16">
                <img src="/assets/icons/arrow.svg" class="w-full h-full aspect-square rotate-180" title="Scroll to Bottom" alt="Arrow Pointing Up" />
            </button>
        </div>

        <div id="content" class="flex-1 h-full max-h-full overflow-auto bg-white flex flex-col justify-start items-center">
            <slot />
        </div>
    </div>
</div>

<style>
    
</style>