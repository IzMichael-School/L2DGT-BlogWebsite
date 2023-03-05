<script lang="ts">
    import Button from '$lib/Button.svelte';

    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    import ListedPost from '$lib/ListedPost.svelte';
    import sanitizeHtml from 'sanitize-html';

    import { anchors } from '$lib/stores';
    $anchors = [];

    import type { Post } from '$lib/types';
    import { goto } from '$app/navigation';
    export let data: DBdata;
    
    interface DBdata {
        posts: Post[]
    };
    let selected: Post = data.posts[0];
    $: if (data.posts) {
        selected = data.posts[0];
    };
</script>

<div class="w-full h-full max-h-full overflow-hidden flex flex-row justify-center items-center p-10">
    <div class="flex flex-col justify-start items-center flex-1 mr-5 h-full max-w-[50%] bg-slate-200 rounded-lg shadow-lg px-5 pt-5 pb-2">
        {#if selected?.id}
            <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{selected.id}/{selected.image}" class="rounded-lg" title={selected.imageAlt} alt={selected.imageAlt} />
            
            <h2 class="w-full text-left text-2xl font-bold mt-5">{selected.title}</h2>
            <h3 class="h-6 flex flex-row justify-start items-center w-full text-left text-lg mt-1">By {selected.expand.author.username} - {selected.expand.category.name}</h3>
            <h3 class="h-6 flex flex-row justify-start items-center w-full text-left text-lg mt-1">{dayjs(selected.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
        
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <p class="w-full text-left flex-1 wrap-long mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden mt-3 max-h-full">{@html sanitizeHtml(selected.content)}</p>
            <Button label="Read the Post ->" click={() => goto('/p/' + selected.slug)} />
        {/if}
    </div>

    <div class="flex flex-col justify-start items-center flex-1 h-full gap-3 max-h-full overflow-y-scroll pr-2">
        <div class="bg-white sticky top-0 w-full pb-2 -mb-1">
            <input class="p-2 rounded-lg w-full bg-gray-100 border-2 border-gray-600" placeholder="Search for a Post..." type="text" />
        </div>
        {#each data.posts as post}
            <ListedPost {post} on:select={() => selected = post} />
        {/each}
    </div>
</div>


<style>
    
</style>