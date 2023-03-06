<svelte:head>
    <title>Iz's Devlog: {data.title}</title>
</svelte:head>

<script lang="ts">
    export let data: Post;
    let post: Post = data;
    import sanitizeHtml from 'sanitize-html';
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);
    import { onMount } from 'svelte';
    
    import { anchors } from '$lib/stores';
    import type { Post } from '$lib/types';
    import Footer from '$lib/Footer.svelte';

    import '/src/gfm.css';

    let content: HTMLDivElement,
        anchorlist: HTMLElement[] = [],
        titleEl: HTMLHeadingElement;

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

<div class="bg-salt flex flex-col items-center justify-start w-full">
    <div class="lg:w-2/3 lg:px-0 w-full h-full px-5 pt-10">
        <figure>
            <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="aspect-auto w-full rounded-lg" title={post.imageAlt} alt={post.imageAlt}>
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
</div>

<style>
    
</style>