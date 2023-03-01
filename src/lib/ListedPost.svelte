<script lang="ts">
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    import { createEventDispatcher } from 'svelte';

    import type { Post } from '$lib/types';
    export let post: Post;

    const dispatch = createEventDispatcher();
</script>

<a href="/p/{post.slug}" class="p-2 bg-slate-200 w-full rounded-lg" on:mouseover={() => dispatch('select')} on:focus={() => dispatch('select')}>
    <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="float-left h-20 aspect-video mr-3" alt={post.imageAlt} />
    <h2 class="text-lg font-bold h-8 flex flex-row justify-start items-center">{post.title}</h2>
    <h3 class="h-6 flex flex-row justify-start items-center w-2/3 text-left">By {post.expand.author.username} - {post.expand.category.name}</h3>
    <h3 class="h-6 flex flex-row justify-start items-center w-2/3 text-left">{dayjs(post.publishedAt).format('MMM Do YYYY - HH:mm a')}</h3>
</a>

<style>
    
</style>

