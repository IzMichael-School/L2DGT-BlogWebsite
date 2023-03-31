<script lang="ts">
    // List of social media accounts, not actually mine.
    const socials: SocialLink[] = [
        { url: 'https://twitter.com/example', icon: 'twitter.svg' },
        { url: 'https://facebook.com/@example', icon: 'facebook.svg' },
        { url: 'https://instagram.com/example', icon: 'instagram.svg' },
        { url: 'https://github.com/example', icon: 'github.svg' },
    ];

    // Type for socials array
    interface SocialLink {
        url: string,
        icon: string
    };
</script>

<div class="flex flex-row justify-start items-center w-full h-[4.5rem] bg-slate-100 border-t-2 border-gray-200">
    <!-- Copyright notice, links to my personal site -->
    <a class="flex-1 px-5 text-2xl text-left hover:underline" href="https://izmichael.com/">&copy; IzMichael 2023 - Produced for L2-DGT</a>

    <div id="social-gradient" class="flex flex-row items-center justify-around flex-1 h-full px-[2%] gap-[2%]">
        {#each socials as link}
            <!-- Social Link, wrapped in Svelte-Each for simple iteration -->
            <a class="group flex items-center justify-center h-full px-10 flex-1" href={link.url}>
                <img src="/assets/icons/{link.icon}" alt="Icon" class="invert h-10 w-10 aspect-square group-hover:invert-[70%]">
            </a>
        {/each}
    </div>
</div>

<style>
    #social-gradient {
        /* Gradient for social buttons, 20% per icon, with a 2% gap for smoothing */
        background: linear-gradient(120deg, rgb(241, 245, 249) 5%,#1DA1F2 7%, #1DA1F2 27%, #4267B2 29%, #4267B2 49%, #E1306C 51%, #E1306C 71%, #000000 73%, #000000 93%, rgb(241, 245, 249) 95%);
    }
</style>