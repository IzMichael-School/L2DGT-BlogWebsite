<svelte:head>
    <title>Iz's Blog: {data.category.name}</title>
</svelte:head>

<script lang="ts">
    // Import Date formatting library
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);

    // Import components, types
    import ListedPost from '$lib/ListedPost.svelte';
    import Button from '$lib/Button.svelte';
    import type { Category, Post } from '$lib/types';

    // Import GFM CSS
    import '/src/gfm.css';

    // Import global anchor store
    import { anchors } from '$lib/stores';
    $anchors = [];

    // Import navigation function
    import { goto } from '$app/navigation';

    // Import data from server preload
    export let data: DBdata;
    
    // Type for server preload
    interface DBdata {
        posts: Post[],
        category: Category,
        total: number
    };

    // Preview pane selection declaration
    let selected: Post = data.posts[0];

    // Reactive function to reset selection and sort posts when posts array updated
    $: if (data.posts) {
        data.posts = data.posts.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
        selected = data.posts[0];
    };

    // Variable declarations, search query, sort option, sort function
    let search = '', sortOption = 'Date (Desc.)', sortRule: ((a: Post, b: Post) => number);

    // Variable declaration for old system of preview pane selection, preserved for posterity
    // let hoverEnabled = true;
</script>

<div class="flex flex-row items-center justify-center w-full h-full max-h-full lg:p-10 p-5 overflow-hidden">
    <!-- Preview Pane -->
    <div id="preview" class="hidden lg:flex flex-col justify-start items-center overflow-hidden flex-1 mr-5 h-full max-w-[50%] bg-slate-200 rounded-lg shadow-lg p-2">
        <!-- If preview pane post has been selected -->
        {#if selected?.id}
            <div class="flex flex-col items-center justify-start flex-1 w-full max-h-full p-3 overflow-hidden text-left">
                <!-- Post cover image -->
                <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{selected.id}/{selected.image}" class="rounded-lg max-h-[75%]" title={selected.imageAlt} alt={selected.imageAlt} />
                
                <!-- Post title -->
                <h1 class="w-full mt-5 text-2xl font-bold">{selected.title}</h1>
                <!-- Post author, category -->
                <h2 class="w-full text-lg font-medium">By {selected.expand.author.username} - {selected.expand.category.name}</h2>
                <!-- Post publishing date -->
                <h3 class="w-full mb-5 text-lg font-medium">{dayjs(selected.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
            
                <!-- Post content, fades out at bottom -->
                <div id="previewContent" class="markdown-body overflow-ellipsis flex-1 w-full overflow-hidden relative">
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html selected.content}
                </div>
            </div>
            
            <!-- Button, navigates to post -->
            <Button label="Read the Post ->" click={() => goto('/p/' + selected.slug)} color={data.category.color} />
        {/if}
    </div>

    <!-- Post list -->
    <div class="flex flex-col items-center justify-start flex-1 h-full max-h-full gap-3 pr-2 overflow-y-scroll">
        <div class="bg-salt sticky top-0 w-full pb-2 -mb-1">
            <!-- Search bar -->
            <label id="searchWrapper" for="search" class="h-11 group hover:bg-gray-200 flex flex-row items-center justify-start w-full overflow-hidden bg-gray-100 border-2 border-gray-600 rounded-lg" style="--input-border: {data.category.color};">
                <!-- Magnifying glass icon -->
                <img src="/assets/icons/search.svg" alt="Search Icon" class="aspect-square w-6 h-6 ml-2" />
                <!-- Input element, value bound to search variable -->
                <input id="search" class="group-hover:bg-gray-200 flex-1 p-2 bg-gray-100" placeholder="Search for a Post..." type="text" bind:value={search} spellcheck="false" />
                <!-- Clear query button, only visible when query exists -->
                <button class="{search?.length > 0 ? 'w-7' : 'w-0'} hover:bg-gray-200 h-full overflow-hidden cursor-pointer" on:click={() => search = ''}>
                    <img src="/assets/icons/cross.svg" alt="Cross Icon" class="aspect-square w-5 h-5 mx-1 overflow-hidden cursor-pointer" />
                </button>
            </label>
            <div class="flex flex-row items-center justify-center w-full mt-1 text-sm text-gray-600">
                <!-- Post list total count -->
                <p class="flex-1 text-left">{data.total} Posts</p>

                <!-- Sorting options, cyclical toggle -->
                <button class="flex flex-row items-center justify-end flex-1 cursor-pointer" on:click={() => {
                    // List of options available
                    let options = [ 'Date (Asc.)', 'Date (Desc.)', 'Title (Asc.)', 'Title (Desc.)' ],
                        // Position in options array
                        index = options.indexOf(sortOption) + 1;
                    // Index wrap around when over or at array length
                    if (index >= options.length) index = 0;
                    // Set selected option to index of options array
                    sortOption = options[index];

                    // Switch statement for setting sort function from option string
                    switch (sortOption) {
                    case 'Date (Asc.)':
                        // If a was published more recently than b, place a before b in the list
                        sortRule = (a, b) => a.publishedAt > b.publishedAt ? 1 : -1;
                        break;

                    case 'Date (Desc.)':
                        // If b was published more recently than a, place a before b in the list
                        sortRule = (a, b) => a.publishedAt < b.publishedAt ? 1 : -1;
                        break;

                    case 'Title (Asc.)':
                        // If a has a title that is before b alphabetically, place a before b in the list
                        sortRule = (a, b) => a.title > b.title ? 1 : -1;
                        break;

                    case 'Title (Desc.)':
                        // If b has a title that is before a alphabetically, place a before b in the list
                        sortRule = (a, b) => a.title < b.title ? 1 : -1;
                        break;

                    default:
                        break;
                    };
                }}>
                    <!-- Sort icon and label -->
                    <img src="/assets/icons/arrow.svg" alt="Arrow Icon" class="w-5 h-5 invert-[35%] {sortOption.endsWith('(Asc.)') ? 'rotate-0' : 'rotate-180'}" />
                    <p class="ml-1 text-right"><b>Sort:</b> {sortOption}</p>
                </button>
            </div>
        </div>
        {#each data.posts.filter(a => a.title.toLowerCase().includes(search?.toLowerCase())).sort(sortRule) as post}
            <!-- New design, click to navigate to post -->
            <ListedPost {post} on:select={() => selected = post } />

            <!-- Old design, click to select and lock in pane -->
            <!-- <ListedPost {post} on:select={() => { if (hoverEnabled) selected = post; }} on:click={() => {
                if (selected.id == post.id) {
                    hoverEnabled = !hoverEnabled;
                } else if (!hoverEnabled) {
                    selected = post;
                } else {
                    hoverEnabled = false;
                };
            }} selected={!hoverEnabled && selected.id == post.id} /> -->
        {/each}
    </div>
</div>


<style>
    /* Preview pane content fade out */
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

    /* Search bar border colouring */
    #searchWrapper:has(input:focus), #searchWrapper:has(input:active) {
        border-color: var(--input-border);
    }
</style>