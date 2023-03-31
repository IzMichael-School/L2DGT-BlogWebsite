<svelte:head>
    <!-- Primary Meta Tags -->
    <meta name="title" content="Iz's Blog">
    <meta name="description" content="A demo blog created for the L2-DGT class at Kingsway School.">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://l2dgt-blog.school.izmichael.com/">
    <meta property="og:title" content="Iz's Blog">
    <meta property="og:description" content="A demo blog created for the L2-DGT class at Kingsway School.">
    <meta property="og:image" content="/assets/img/cover.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://l2dgt-blog.school.izmichael.com/">
    <meta property="twitter:title" content="Iz's Blog">
    <meta property="twitter:description" content="A demo blog created for the L2-DGT class at Kingsway School.">
    <meta property="twitter:image" content="/assets/img/cover.png">

    <!-- Plausible Analytics -->
    <script defer data-domain="l2dgt-blog.school.izmichael.com" src="https://analytics.izmichael.com/js/script.js"></script>
</svelte:head>

<script lang="ts">
    // Import components
    import HeaderTab from '../lib/HeaderTab.svelte';
    import Spinner from '$lib/Spinner.svelte';

    // Import Global stylesheets
    import '../app.css';
    import '../fonts.css';

    // Import svelte libraries for transitions and runtime info
    import { fade, fly } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    
    // Inport Anchor array
    import { anchors } from '$lib/stores';

    // Import data from server preload, types
    export let data: {
        categories: Category[],
        currentPath: string
    };
    import type { Category } from '$lib/types';

    // Function for sleep
    // Not 100% accurate, thanks to JS time execution
    function sleep(s: number) {
        // returns after s number of seconds elapses
        return new Promise(resolve => setTimeout(resolve, (s * 1000)));
    };

    // Type indication for scroll indicator position
    interface ScrollIndicatorPos {
        top: number,
        left: 'unset' | number,
        height: number
    };

    // Declare variables for sidebar scroll indicator
    let scrollIndicator: ScrollIndicatorPos = {
        top: 0,
        left: 'unset',
        height: 0
    }, anchorBtns: HTMLDivElement,
        body: HTMLDivElement;

    // Check which headings are visible, then set the highlight indicator to those positions in the sidebar
    function checkScroll() {
        // If running in a browser (because ssr), and there are anchors, and their buttons have been rendered
        if (browser && $anchors.length > 0 && anchorBtns?.children.length > 0) {
            // Get all headings that are in view, calculated by top bounds, minus the page header height
            let inview = $anchors.filter(a => a.heading.getBoundingClientRect().top - remPx(4) < window.innerHeight - remPx(4) && a.heading.getBoundingClientRect().top > remPx(4));
            // If no headings are in view, end stack
            if (inview.length < 1) return;
            // Get index of top header
            let index = $anchors.indexOf(inview[0]);
            // Set scroll indicator to match heading's buttons
            scrollIndicator.top = anchorBtns.querySelectorAll('button')[index].getBoundingClientRect().top;
            scrollIndicator.height = anchorBtns.querySelectorAll('button')[0].getBoundingClientRect().height * inview.length;
            scrollIndicator.left = 'unset';
        } else if ($anchors.length < 1 && anchorBtns) {
            // Set scroll indicator to hidden
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

    // If running in a browser, run checkScroll() when the user scrolls
    if (browser) {
        window.addEventListener('scroll', () => checkScroll(), true);
    };

    // Convert REM units to PX units, based on document scale
    function remPx(rem: number) {    
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    };
</script>

<div id="site" class="flex flex-col items-center justify-center w-screen h-screen max-h-screen overflow-hidden font-sans">
    <!-- Site header bar -->
    <div id="header" class="bg-slate-100 z-50 flex flex-row flex-wrap items-center justify-start w-full h-16 px-4 pl-0 pb-0 shadow-md">
        <!-- Side padding for when sidebar is in view -->
        <div class="aspect-square relative mr-2 h-16 border-gray-200 {$anchors.length > 0 ? 'w-16 border-r-2' : 'w-0 border-r-0'}"></div>
        
        <!-- Favicon and title, links back to home page -->
        <a href="/" class="flex flex-row justify-start items-center group">
            <img src="/favicon.png" class="aspect-square w-12 h-12 rounded-lg group-hover:brightness-90" alt="Favicon" />
            <h1 class="ml-4 mr-10 text-4xl font-bold group-hover:text-gray-700">Iz's Blog</h1>
        </a>

        <!-- Home tab -->
        <HeaderTab title="Home" color="#3b82f6" url="/" id="_home" />
        <!-- A tab for each category -->
        {#each (data.categories ?? []) as category}
            <HeaderTab title={category.name} color={category.color} url="/c/{category.slug}" id={category.id} />
        {/each}
    </div>
    <!-- Site sidebar, only visible on post pages -->
    <div class="flex flex-row items-center justify-center flex-1 w-full max-h-full overflow-y-auto">
        <div id="sidebar" class="bg-slate-100 flex flex-col items-center justify-between max-h-full overflow-y-scroll overflow-x-hidden h-full border-gray-200 {$anchors.length > 0 ? 'w-16' : 'w-0'}">
            <!-- Jump to top of page -->
            <button class="aspect-square w-16 h-16 p-2" on:click={() => document.getElementById('anchor-top')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="aspect-square w-full h-full" title="Scroll to Top" alt="Arrow Pointing Up" />
            </button>

            <!-- Anchors, each is mapped to a heading on the page -->
            <div class="z-20 flex flex-col items-center justify-center" bind:this={anchorBtns}>
                {#each ($anchors ?? []) as anchor, i}
                    <button title={anchor.name} class="aspect-square hover:bg-slate-300 w-12 h-12 p-2 text-lg font-bold rounded-lg" on:click={async () => {
                        // Scroll to heading
                        anchor.heading.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center'
                        });
                        // Highlight heading for a second
                        await sleep(0.25);
                        anchor.heading.classList.add('active-heading');
                        await sleep(1);
                        anchor.heading.classList.remove('active-heading');
                    }}>{i}</button>
                {/each}
            </div>

            <!-- Jump to bottom of page -->
            <button class="aspect-square w-16 h-16 p-2" on:click={() => document.getElementById('anchor-bottom')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })}>
                <img src="/assets/icons/arrow.svg" class="aspect-square w-full h-full rotate-180" title="Scroll to Bottom" alt="Arrow Pointing Up" />
            </button>

            <!-- Anchor scroll indicator -->
            <div class="bg-slate-200 absolute z-10 w-12 px-1 mx-2 rounded-lg" style="top: {scrollIndicator.top}px; height: {scrollIndicator.height}px;"></div>
        </div>

        <div id="content" class="bg-salt flex-1 h-full max-h-full overflow-x-hidden overflow-y-auto" bind:this={body}>
            <!-- Svelte-Key block, re-renders the slot when the page url changes -->
            {#key data.currentPath}
                <!-- Page contents, wrapper for overflow protection and transitionary declarations -->
                <div id="body" class="w-full h-full overflow-x-hidden {$navigating ? 'z-[-100]' : 'z-0'}" in:fly|local={{ y: -body.scrollHeight, duration: 750, delay: 750 }} out:fly|local={{ y: -body.scrollHeight, duration: 750 }}>
                    <slot />
                </div>
            {/key}
        </div>
    </div>
</div>

<!-- If page is loading, show spinner -->
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