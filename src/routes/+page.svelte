<svelte:head>
    <title>Iz's Blog</title>
</svelte:head>

<script lang="ts">
    // Import components, types, libraries
    import GridPost from '$lib/GridPost.svelte';
    import Footer from '$lib/Footer.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import type { Post, Author } from '$lib/types';
    import { Turnstile } from 'svelte-turnstile';

    import { anchors } from '$lib/stores';
    $anchors = [];

    export let data: {
        posts: Post[],
        authors: Author[]
    };
    export let form;
    let submitting = false;
</script>

<!-- Hero section, image grid -->
<section class="p-5 grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-2 gap-5 snap">
    <GridPost width={2} height={2} post={data.posts[0]} />
    {#each data.posts.slice(1) as post}
        <GridPost width={1} height={1} {post} />
    {/each}
</section>

<section class="flex lg:flex-row flex-col flex-wrap justify-center items-center p-10 relative snap bg-navy text-white">
    <!-- Tweak wording when plural authors -->
    <h1 class="text-4xl lg:vertical lg:px-10 pb-10 lg:pb-0 lg:absolute lg:top-0 lg:bottom-0 font-bold lg:left-0 lg:h-full w-full lg:w-fit text-center">Who {data.authors.length > 1 ? 'Are We?' : 'Am I'}?</h1>

    <!-- Support multiple authors -->
    {#each data.authors as author}
        <div class="lg:flex-1 lg:min-w-[33%] lg:max-w-[75%] w-full lg:w-auto flex flex-col justify-center items-center">
            <img src="https://l2dgt-blog-db.school.izmichael.com/api/files/authors/{author.id}/{author.avatar}" class="w-32 h-32 aspect-square rounded-full" alt="{author.username}'s Profile Picture" />
            <h2 class="text-4xl text-center pt-4 pb-5 border-b-2 border-gray-400 px-5">{author.username}</h2>
            <div class="text-center pt-5 text-lg">
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html author.bio}
            </div>
        </div>
    {/each}
</section>

<section id="contact" class="flex lg:flex-row flex-col justify-center items-center relative">
    <h1 class="text-4xl lg:vertical lg:px-10 pb-10 lg:pb-0 lg:absolute lg:top-0 lg:bottom-0 font-bold lg:left-0 lg:h-full w-full lg:w-fit text-center">Get in Touch!</h1>

    <form class="flex flex-col justify-center items-center lg:w-1/2 w-full h-full px-10 lg:px-0" method="POST">
        {#if !submitting}
        <p>Your Email Address</p>
        <input type="email" name="email" placeholder="person@example.com" />
        <br>
        <p>Subject</p>
        <input type="text" name="subject" placeholder="What are you talking about?" />
        <br>
        <p>Your Message</p>
        <textarea name="message" class="h-48" placeholder="What do you have to say?" />
        <br>
        <div class="w-full flex lg:flex-row flex-col lg:justify-between justify-start items-center">
            <!-- Cloudflare Turnstile - Alternate to ReCaptcha -->
            <Turnstile siteKey="0x4AAAAAAADMCwMvIGE8RdlL" />
            <!-- Submit button -->
            <button type="submit" value="submit" on:click={() => submitting = true} class="p-2 rounded-lg lg:w-1/3 w-full lg:mt-0 mt-2 bg-navy text-white font-bold hover:brightness-150 active:brightness-100">Send</button>
        </div>
        {:else}
            <!-- Loading icon for while server processes -->
            <Spinner />
        {/if}
        {#if form?.error}
            <p>{form?.error}</p>
        {/if}
    </form>
</section>

<Footer />

<style>
    /* Scroll snapping stuff */
    section {
        width: 100%;
        min-height: calc(100vh - 4rem);
    }

    .snap {
        scroll-snap-align: center;
    }

    /* Vertical text */

    @media (min-width: 1024px) {
        .lg\:vertical {
            writing-mode: vertical-lr;
            transform: rotate(180deg);
        }
    }

    /* Contact form elements */
    #contact p {
        @apply text-left w-full text-lg mb-2;
    }
    #contact input, #contact textarea {
        @apply p-2 w-full rounded-lg cursor-text bg-transparent text-lg ring-2 ring-gray-400 resize-none;
    }
    #contact input:hover:not(:focus), #contact textarea:hover:not(:focus) {
        @apply bg-gray-200;
    }
    #contact input:active, #contact input:focus, #contact textarea:active, #contact textarea:focus {
        @apply ring-blue;
    }
</style>