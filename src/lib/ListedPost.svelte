<script lang="ts">
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    import { createEventDispatcher } from 'svelte';

    import type { Post } from '$lib/types';
    export let post: Post, selected = false;

    const dispatch = createEventDispatcher();
</script>

<button class="{selected ? 'bg-slate-300' : 'bg-slate-200'} w-full p-2 rounded-lg cursor-pointer" on:mouseover={() => dispatch('select')} on:focus={() => dispatch('select')} on:click={() => dispatch('click')}>
    <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="aspect-video float-left h-20 mr-3 rounded-lg" title={post.imageAlt} alt={post.imageAlt} />
    
    <h2 class="flex flex-row items-center justify-start h-8 text-lg font-bold">{post.title}</h2>
    <h3 class="flex flex-row items-center justify-start w-2/3 h-6 text-left">By {post.expand.author.username} - {post.expand.category.name}</h3>
    <h3 class="flex flex-row items-center justify-start w-2/3 h-6 text-left">{dayjs(post.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
</button>

<style>
    
</style>

