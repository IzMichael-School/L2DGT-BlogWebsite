<script lang="ts">
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    import { createEventDispatcher } from 'svelte';

    import type { Post } from '$lib/types';
    export let post: Post, selected = false;

    const dispatch = createEventDispatcher();
</script>

<button class="{selected ? 'bg-slate-300' : 'bg-slate-200'} w-full h-24 p-2 rounded-lg cursor-pointer flex flex-row justify-start items-center" on:mouseover={() => dispatch('select')} on:focus={() => dispatch('select')} on:click={() => dispatch('click')}>
    <div class="aspect-video h-full flex justify-center items-start mr-3">
        <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="h-20 rounded-lg" title={post.imageAlt} alt={post.imageAlt} />
    </div>
    
    <div class="flex flex-col justify-center items-start flex-1">
        <h2 class="text-lg font-bold">{post.title}</h2>
        <h3 class="text-left">By {post.expand.author.username} - {post.expand.category.name}</h3>
        <h3 class="text-left">{dayjs(post.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
    </div>
</button>

<style>
    
</style>

