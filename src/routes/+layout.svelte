<script lang="ts">
    import HeaderTab from '../lib/HeaderTab.svelte';

    import '../app.css';
    import '../fonts.css';

    import { fade, fly } from 'svelte/transition';
    import { darkmode, anchors } from '$lib/stores';
    import type { Category } from '$lib/types';
    import { navigating } from '$app/stores';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import Spinner from '$lib/Spinner.svelte';
    export let data: {
        categories: Category[],
        currentPath: string
    };

    function sleep(s: number) {
        return new Promise(resolve => setTimeout(resolve, (s * 1000)));
    };

    interface ScrollIndicatorPos {
        top: number,
        left: 'unset' | number,
        height: number
    };

    let scrollIndicator: ScrollIndicatorPos = {
        top: 0,
        left: 'unset',
        height: 0
    }, anchorBtns: HTMLDivElement,
        body: HTMLDivElement;

    function checkScroll() {
        if (browser && $anchors.length > 0 && anchorBtns?.children.length > 0) {
            let inview = $anchors.filter(a => a.heading.getBoundingClientRect().top - remPx(4) < window.innerHeight - remPx(4) && a.heading.getBoundingClientRect().top > remPx(4));
            if (inview.length < 1) return;
            let index = $anchors.indexOf(inview[0]);
            scrollIndicator.top = anchorBtns.querySelectorAll('button')[index].getBoundingClientRect().top;
            scrollIndicator.height = anchorBtns.querySelectorAll('button')[0].getBoundingClientRect().height * inview.length;
            scrollIndicator.left = 'unset';

            // scrollIndicator.top = $anchors.filter(a => a.heading.getBoundingClientRect().top > 0)[0].heading.getBoundingClientRect().top;
        } else if ($anchors.length < 1 && anchorBtns) {
            scrollIndicator.top = anchorBtns.getBoundingClientRect().top;
            scrollIndicator.height = 0;
            scrollIndicator.left = -30;
        };
    };
    onMount(() => {
        checkScroll();

        // Anchor Update Checker
        
        let anchorObserver = new MutationObserver(checkScroll);
        anchorObserver.observe(anchorBtns, {
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

<div id="site" class="flex flex-col items-center justify-center w-screen h-screen max-h-screen overflow-hidden font-sans">
    <div id="header" class="bg-slate-100 z-50 flex flex-row items-center justify-start w-full h-16 pr-4 shadow-md">
        <button class="aspect-square relative w-16 h-16 mr-2 border-r-2 border-gray-200" on:click={() => $darkmode = !$darkmode}>
            {#if $darkmode}
                <img src="/assets/icons/moon.svg" transition:fade class="aspect-square absolute inset-0 w-8 h-8 m-4" alt="Moon Icon" />
            {:else}
                <img src="/assets/icons/sun.svg" transition:fade class="aspect-square absolute inset-0 w-8 h-8 m-4" alt="Sun Icon" />
            {/if}
        </button>
        
        <img src="/favicon.png" class="aspect-square w-12 h-12 rounded-lg" alt="Favicon" />
        <h1 class="ml-4 mr-10 text-4xl font-bold">Iz's Devlog</h1>

        <HeaderTab title="Home" color="#3b82f6" url="/" />
        {#each (data.categories ?? []) as category}
            <HeaderTab title={category.name} color={category.color} url="/c/{category.slug}" />
        {/each}
    </div>
    <div class="flex flex-row items-center justify-center flex-1 w-full max-h-full overflow-y-auto">
        <div id="sidebar" class="bg-slate-100 flex flex-col items-center justify-between max-h-full overflow-y-scroll overflow-x-hidden h-full border-gray-200 {$anchors.length > 0 ? 'w-16' : 'w-0'}">
            <button class="aspect-square w-16 h-16 p-2" on:click={() => document.getElementById('anchor-top')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="aspect-square w-full h-full" title="Scroll to Top" alt="Arrow Pointing Up" />
            </button>

            <div class="z-20 flex flex-col items-center justify-center" bind:this={anchorBtns}>
                {#each ($anchors ?? []) as anchor, i}
                    <button title={anchor.name} class="aspect-square hover:bg-slate-300 w-12 h-12 p-2 text-lg font-bold rounded-lg" on:click={async () => {
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

            <button class="aspect-square w-16 h-16 p-2" on:click={() => document.getElementById('anchor-bottom')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="aspect-square w-full h-full rotate-180" title="Scroll to Bottom" alt="Arrow Pointing Up" />
            </button>

            <div class="bg-slate-200 absolute z-10 w-12 px-1 mx-2 rounded-lg" style="top: {scrollIndicator.top}px; height: {scrollIndicator.height}px;"></div>
        </div>

        <div id="content" class="bg-salt flex-1 h-full max-h-full overflow-x-hidden overflow-y-auto" bind:this={body}>
            <span id="anchor-top" class="invisible block h-0 px-1 overflow-hidden" />
            {#key data.currentPath}
                <!-- <div class="w-full h-full" in:fly|local={{ x: body.scrollWidth, duration: 1000, delay: 1000 }} out:fly|local={{ x: body.scrollWidth, duration: 1000 }}> -->
                <div id="body" class="w-full h-full overflow-x-hidden {$navigating ? 'z-[-100]' : 'z-0'}" in:fly|local={{ y: -body.scrollHeight, duration: 750, delay: 750 }} out:fly|local={{ y: -body.scrollHeight, duration: 750 }}>
                <!-- <div class="w-full h-full" in:fly|local={{ x: 256, duration: 750, delay: 750 }} out:fly|local={{ x: 256, duration: 750 }}></div> -->
                <!-- <div class="w-full h-full" transition:fade|local> -->
                <!-- <div class="w-full h-full"> -->
                        <slot />
                </div>
            {/key}
            <span id="anchor-bottom" class="invisible block h-0 px-1 overflow-hidden" />
        </div>
    </div>
</div>

{#if $navigating}
    <div class="w-screen h-screen overflow-hidden flex justify-center items-center absolute inset-0 z-[1000] bg-black/50">
        <div class="aspect-square p-10 h-1/2 rounded-lg overflow-hidden z-[1000000000000] bg-white shadow-2xl flex flex-col justify-center items-center" transition:fade|local>
            <Spinner />
            <h1 class="font-inter mt-10 text-6xl">Loading...</h1>
        </div>
    </div>
{/if}

<style>
    
</style>