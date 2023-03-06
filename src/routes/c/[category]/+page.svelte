<svelte:head>
    <title>Iz's Devlog: {data.category.name}</title>
</svelte:head>

<script lang="ts">
    import Button from '$lib/Button.svelte';

    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    import ListedPost from '$lib/ListedPost.svelte';
    import sanitizeHtml from 'sanitize-html';

    import '/src/gfm.css';

    import { anchors } from '$lib/stores';
    $anchors = [];

    import type { Category, Post } from '$lib/types';
    import { goto } from '$app/navigation';
    export let data: DBdata;
    
    interface DBdata {
        posts: Post[],
        category: Category,
        total: number
    };
    let selected: Post = data.posts[0];
    $: if (data.posts) {
        data.posts = data.posts.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
        selected = data.posts[0];
    };

    let search = '', sortOption = 'Date (Desc.)', hoverEnabled = true;
</script>

<div class="flex flex-row items-center justify-center w-full h-full max-h-full p-10 overflow-hidden">
    <div class="flex flex-col justify-start items-center overflow-hidden flex-1 mr-5 h-full max-w-[50%] bg-slate-200 rounded-lg shadow-lg p-2">
        {#if selected?.id}
            <div class="flex flex-col items-center justify-start flex-1 w-full max-h-full p-3 overflow-hidden text-left">
                <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{selected.id}/{selected.image}" class="rounded-lg" title={selected.imageAlt} alt={selected.imageAlt} />
                
                <h2 class="w-full mt-5 text-2xl font-bold">{selected.title}</h2>
                <h3 class="w-full text-lg font-medium">By {selected.expand.author.username} - {selected.expand.category.name}</h3>
                <h3 class="w-full mb-5 text-lg font-medium">{dayjs(selected.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
            
                <div id="previewContent" class="markdown-body overflow-ellipsis flex-1 w-full overflow-hidden">
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html selected.content}
                </div>
            </div>
            
            <Button label="Read the Post ->" click={() => goto('/p/' + selected.slug)} color={data.category.color} />
        {/if}
    </div>

    <div class="flex flex-col items-center justify-start flex-1 h-full max-h-full gap-3 pr-2 overflow-y-scroll">
        <div class="bg-salt sticky top-0 w-full pb-2 -mb-1">
            <label for="search" class="h-11 flex flex-row items-center justify-start w-full overflow-hidden bg-gray-100 border-2 border-gray-600 rounded-lg">
                <img src="/assets/icons/search.svg" alt="Search Icon" class="aspect-square w-6 h-6 ml-2" />
                <input id="search" class="flex-1 p-2 bg-gray-100" placeholder="Search for a Post..." type="text" bind:value={search} spellcheck="false" />
                <button class="{search?.length > 0 ? 'w-7' : 'w-0'} hover:bg-gray-200 h-full overflow-hidden cursor-pointer" on:click={() => search = ''}>
                    <img src="/assets/icons/cross.svg" alt="Cross Icon" class="aspect-square w-5 h-5 mx-1 overflow-hidden cursor-pointer" />
                </button>
            </label>
            <div class="flex flex-row items-center justify-center w-full mt-1 text-sm text-gray-600">
                <p class="flex-1 text-left">{data.total} Posts</p>

                <button class="flex flex-row items-center justify-end flex-1 cursor-pointer" on:click={() => {
                    let options = [ 'Date (Asc.)', 'Date (Desc.)', 'Title (Asc.)', 'Title (Desc.)' ], index = options.indexOf(sortOption) + 1;
                    if (index >= options.length) index = 0;
                    sortOption = options[index];

                    switch (sortOption) {
                    case 'Date (Asc.)':
                        data.posts = data.posts.sort((a, b) => a.publishedAt > b.publishedAt ? 1 : -1);
                        break;

                    case 'Date (Desc.)':
                        data.posts = data.posts.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
                        break;

                    case 'Title (Asc.)':
                        data.posts = data.posts.sort((a, b) => a.title > b.title ? 1 : -1);
                        break;

                    case 'Title (Desc.)':
                        data.posts = data.posts.sort((a, b) => a.title < b.title ? 1 : -1);
                        break;

                    default:
                        break;
                    };
                }}>
                    <img src="/assets/icons/arrow.svg" alt="Arrow Icon" class="w-5 h-5 invert-[35%] {sortOption.endsWith('(Asc.)') ? 'rotate-0' : 'rotate-180'}" />
                    <p class="ml-1 text-right"><b>Sort:</b> {sortOption}</p>
                </button>
            </div>
        </div>
        {#each data.posts.filter(a => a.title.toLowerCase().includes(search?.toLowerCase())) as post}
            <ListedPost {post} on:select={() => { if (hoverEnabled) selected = post; }} on:click={() => {
                if (selected.id == post.id) {
                    hoverEnabled = !hoverEnabled;
                } else if (!hoverEnabled) {
                    selected = post;
                } else {
                    hoverEnabled = false;
                };
            }} selected={!hoverEnabled && selected.id == post.id} />
        {/each}
    </div>
</div>


<style>
    * {
        outline: none;
    }

    #previewContent {
        position: relative;
    }

    #previewContent:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(226, 232, 240, 0), rgba(226, 232, 240, 0.5) 75%, rgba(226, 232, 240, 1) 100%);
        width: 100%;
        height: 100%;
    }
</style>