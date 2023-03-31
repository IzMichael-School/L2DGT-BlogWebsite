<script lang="ts">
    // Import navigation function
    import { goto } from '$app/navigation';
    // Import date formatting library
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    // Import types for post
    import type { Post } from '$lib/types';
    // Import Component Attributes
    export let post: Post, selected = false;

    // Component event generation
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<!-- New design, click to navigate to post -->
<button class="{selected ? 'bg-slate-300' : 'bg-slate-200'} w-full h-24 p-2 rounded-lg cursor-pointer flex flex-row justify-start items-center" on:mouseover={() => dispatch('select')} on:focus={() => dispatch('select')} on:click={() => goto('/p/' + post.slug)}>
    <div class="aspect-video h-full flex justify-center items-start mr-3">
        <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="h-20 rounded-lg" title={post.imageAlt} alt={post.imageAlt} />
    </div>
    
    <div class="flex flex-col justify-center items-start flex-1">
        <h1 class="text-base lg:text-lg font-bold">{post.title}</h1>
        <h2 class="text-sm lg:text-base text-left">By {post.expand.author.username} - {post.expand.category.name}</h2>
        <h3 class="text-sm lg:text-base text-left">{dayjs(post.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
    </div>
</button>

<!-- Original design, click to select and lock in preview pane -->
<!-- <button class="{selected ? 'bg-slate-300' : 'bg-slate-200'} w-full h-24 p-2 rounded-lg cursor-pointer flex flex-row justify-start items-center" on:mouseover={() => dispatch('select')} on:focus={() => dispatch('select')} on:click={() => dispatch('click')}>
    <div class="aspect-video h-full flex justify-center items-start mr-3">
        <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}" class="h-20 rounded-lg" title={post.imageAlt} alt={post.imageAlt} />
    </div>
    
    <div class="flex flex-col justify-center items-start flex-1">
        <h1 class="text-lg font-bold">{post.title}</h1>
        <h2 class="text-left">By {post.expand.author.username} - {post.expand.category.name}</h2>
        <h3 class="text-left">{dayjs(post.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
    </div>
</button> -->

<style>
    
</style>

