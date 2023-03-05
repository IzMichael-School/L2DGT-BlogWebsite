<script lang="ts">
    import HeaderTab from '../lib/HeaderTab.svelte';

    import '../app.css';
    import '../fonts.css';

    import { fade } from 'svelte/transition';
    import { darkmode, anchors } from '$lib/stores';
    import type { Category } from '$lib/types';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    export let data: {
        categories: Category[]
    };

    function sleep(s: number) {
        return new Promise(resolve => setTimeout(resolve, (s * 1000)));
    };

    let scrollIndicator = {
            top: 0,
            height: 0
        }, anchorBtns: HTMLDivElement;

    function checkScroll() {
        if (browser && $anchors.length > 0 && anchorBtns?.children.length > 0) {
            let inview = $anchors.filter(a => a.heading.getBoundingClientRect().top - remPx(4) < window.innerHeight - remPx(4) && a.heading.getBoundingClientRect().top > remPx(4));
            if (inview.length < 1) return;
            let index = $anchors.indexOf(inview[0]);
            scrollIndicator.top = anchorBtns.querySelectorAll('button')[index].getBoundingClientRect().top;
            scrollIndicator.height = anchorBtns.querySelectorAll('button')[0].getBoundingClientRect().height * inview.length;

            // scrollIndicator.top = $anchors.filter(a => a.heading.getBoundingClientRect().top > 0)[0].heading.getBoundingClientRect().top;
        } else if ($anchors.length < 1) {
            scrollIndicator.top = anchorBtns.getBoundingClientRect().top;
            scrollIndicator.height = 0;
        };
    };
    onMount(() => {
        checkScroll();
        
        let observer = new MutationObserver(checkScroll);

        observer.observe(anchorBtns, {
            childList: true,
            attributes: true,
            characterData: true
        });
    });

    if (browser) {
        window.addEventListener('scroll', () => checkScroll(), true);
    };

    function remPx(rem: number) {    
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
            <button class="p-2 aspect-square w-16 h-16" on:click={() => document.getElementById('#anchor-top')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="w-full h-full aspect-square" title="Scroll to Top" alt="Arrow Pointing Up" />
            </button>

            <div class="flex flex-col justify-center items-center z-20" bind:this={anchorBtns}>
                {#each ($anchors ?? []) as anchor, i}
                    <button title={anchor.name} class="p-2 w-12 h-12 aspect-square text-lg font-bold hover:bg-slate-300 rounded-lg" on:click={async () => {
                        anchor.heading.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center'
                        });
                        await sleep(0.25);
                        anchor.heading.classList.add('active-heading');
                        await sleep(1);
                        anchor.heading.classList.remove('active-heading');
                    }}>{i}</button>
                {/each}
            </div>

            <button class="p-2 aspect-square w-16 h-16" on:click={() => document.getElementById('#anchor-bottom')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="w-full h-full aspect-square rotate-180" title="Scroll to Bottom" alt="Arrow Pointing Up" />
            </button>

            <div class="bg-slate-200 rounded-lg w-12 px-1 absolute mx-2 z-10" style="top: {scrollIndicator.top}px; height: {scrollIndicator.height}px;"></div>
        </div>

        <div id="content" class="flex-1 h-full max-h-full overflow-auto bg-white">
            <span id="anchor-top" class="h-0 px-1 block invisible overflow-hidden" />
            <slot />
            <span id="anchor-bottom" class="h-0 px-1 block invisible overflow-hidden" />
        </div>
    </div>
</div>

<style>
    
</style>