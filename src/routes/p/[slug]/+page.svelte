<svelte:head>
    <title>Iz's Devlog: {data.title}</title>
</svelte:head>

<script lang="ts">
    export let data: Post;
    let post: Post = data;
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);
    import { onMount } from 'svelte';
    
    import { anchors } from '$lib/stores';
    import type { Post } from '$lib/types';
    import Ribbon from '$lib/Ribbon.svelte';
    import Footer from '$lib/Footer.svelte';
    import ReadingOptions from '$lib/ReadingOptions.svelte';
    
    import { invertColor } from '$lib/stores';

    import '/src/gfm.css';

    let content: HTMLDivElement,
        parent: HTMLDivElement,
        wrapper: HTMLDivElement,
        anchorlist: HTMLElement[] = [],
        titleEl: HTMLHeadingElement,
        options = false;

    onMount(() => {
        anchorlist = [titleEl, ...content.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')];
        anchorlist.filter(i => i?.id);
        $anchors = anchorlist.map(a => {
            let text = a.innerText || a.textContent || a.innerHTML;
            a.id = text.toLowerCase().replaceAll(' ', '-').replaceAll(/[\u{0080}-\u{FFFF}]/gu, '');
            return {
                id: a.id,
                name: text,
                heading: a
            };
        });
    });
</script>

<div class="bg-salt flex flex-col items-center justify-start w-full relative" bind:this={wrapper}>
    <div class="h-full px-5 pt-10" style="width: 66.6%;" bind:this={parent}>
        <figure>
            <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="max-h-[50vh] max-w-full mx-auto rounded-lg" title={post.imageAlt} alt={post.imageAlt}>
            <figcaption class="mt-2 italic font-bold text-gray-500">{post.imageCaption}</figcaption>
        </figure>
        <h1 class="w-full mt-5 text-3xl font-bold text-center" bind:this={titleEl}>{post.title}</h1>
        <h3 class="w-full mt-1 text-lg font-medium text-center">By {post.expand.author.username} - {post.expand.category.name}</h3>
        <h3 class="w-full mt-1 text-lg font-medium text-center">{dayjs(post.publishedAt).format('dddd, Do MMMM YYYY - HH:mm a')}</h3>

        <div class="markdown-body w-full py-10" bind:this={content}>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html data.content}
        </div>
    </div>
    
    <Footer />

    <!-- Viewing Options -->

    <button class="absolute top-0 right-5 cursor-pointer hover:translate-y-0 {options ? '' : '-translate-y-10'} flex flex-col justify-center items-center" on:click={() => options = true}>
        <Ribbon color={post.expand.category.color} width="2.5rem">
            <img src="/assets/icons/page-settings.svg" class="w-8 h-8 aspect-square my-2 {invertColor(post.expand.category.color) == '#000000' ? '' : 'invert'}" alt="Settings Icon" />
        </Ribbon>
    </button>

    {#if options}
        <ReadingOptions on:close={() => options = false} mdBody={content} mdParent={parent} mdWrapper={wrapper} />
    {/if}
</div>

<style>
    
</style>