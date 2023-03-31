<svelte:head>
    <title>Iz's Blog: {data.title}</title>
</svelte:head>

<script lang="ts">
    // Import post data from server preload
    export let data: Post;
    let post: Post = data;

    // Import Date formatting library
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);
    
    // Import components, types
    import { anchors, tab } from '$lib/stores';
    import type { Post } from '$lib/types';
    import Ribbon from '$lib/Ribbon.svelte';
    import Footer from '$lib/Footer.svelte';
    import ReadingOptions from '$lib/ReadingOptions.svelte';
    
    // Import other libraries, GFM CSS
    import { postStyle, invertColor } from '$lib/stores';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import '/src/gfm.css';

    // Reactively update store for tab with current category, used for header colouring
    $: $tab = post.category;

    // Declare variables
    let content: HTMLDivElement,
        anchorlist: HTMLElement[] = [],
        titleEl: HTMLHeadingElement,
        options = false;

    // When page loads
    onMount(() => {
        // Fix default width if on mobile
        if (browser && window.innerWidth < 1024 && $postStyle.width == '66.667%') $postStyle.width = '100%';
        // List numbers as words
        let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        // Get every element within the post body that is a heading
        anchorlist = [titleEl, ...content.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')];
        // Ensure that the element can have an ID attribute, mainly for TS purposes, but it's useful to have
        anchorlist.filter(i => i?.id);
        // For every heading element, add an anchor to the global store, with the element refrerence, header content, and ID
        $anchors = anchorlist.map(a => {
            // Get text from header element
            let text = a.innerText || a.textContent || a.innerHTML;
            // Parse ID from text: Convert to lower case, replace spaces with hyphens, remove all non-ascii characters, replace numbers (1, 2, 3) with words (one, two, three)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            a.id = text.toLowerCase().replaceAll(' ', '-').replaceAll(/[\u{0080}-\u{FFFF}]/gu, '').split('').map((val: any) => numbers[val] || val).join('');
            // Return an object with the anchor data, for the global array
            return {
                id: a.id,
                name: text,
                heading: a
            };
        });
    });
</script>

<div class="flex flex-col items-center justify-start w-full relative" style="background-color: {$postStyle.backgroundColor};">
    <!-- Anchor for sidebar jumping -->
    <span id="anchor-top" class="invisible block h-0 px-1 overflow-hidden" />

    <div class="h-full px-5 lg:pt-10 pt-20" style="width: {$postStyle.width};">
        <!-- Cover image -->
        <figure>
            <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="max-h-[50vh] max-w-full mx-auto rounded-lg" title={post.imageAlt} alt={post.imageAlt}>
            <figcaption class="mt-2 italic font-bold text-gray-500">{post.imageCaption}</figcaption>
        </figure>
        <!-- Title -->
        <h1 class="w-full mt-5 text-3xl font-bold text-center" bind:this={titleEl}>{post.title}</h1>
        <!-- Author, Category -->
        <h2 class="w-full mt-1 text-lg font-medium text-center">By {post.expand.author.username} - {post.expand.category.name}</h2>
        <!-- Date Published, parsed through DayJS -->
        <h3 class="w-full mt-1 text-lg font-medium text-center">{dayjs(post.publishedAt).format('dddd, Do MMMM YYYY - HH:mm a')}</h3>

        <!-- Post content, styled with GFM -->
        <div id="postContent" class="markdown-body w-full py-10" style="font-size: {$postStyle.fontSize}; font-family: {$postStyle.fontFamily};">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html data.content}
        </div>
    </div>
    
    <!-- Self explanatory -->
    <Footer />

    <!-- Reading Options -->
    <!-- Ribbon with page settings icon, click function shows modal -->
    <button class="absolute top-0 right-5 cursor-pointer flex flex-col justify-center items-center" on:click={() => options = true}>
        <Ribbon color={post.expand.category.color} width="2.5rem">
            <img src="/assets/icons/page-settings.svg" class="w-8 h-8 aspect-square my-2 {invertColor(post.expand.category.color) == '#000000' ? '' : 'invert'}" alt="Settings Icon" />
        </Ribbon>
    </button>

    <!-- If variable to show reading options is true, show reading options modal component -->
    {#if options}
        <ReadingOptions on:close={() => options = false} />
    {/if}
    
    <!-- Anchor for sidebar jumping -->
    <span id="anchor-bottom" class="invisible block h-0 px-1 overflow-hidden" />
</div>

<style>
    
</style>