<script lang="ts">
    const socials: SocialLink[] = [
        { url: 'https://twitter.com/izmichael7', icon: 'twitter.svg' },
        { url: 'https://facebook.com/@izmichael77', icon: 'facebook.svg' },
        { url: 'https://instagram.com/izmichael7', icon: 'instagram.svg' },
        { url: 'https://github.com/izmichael', icon: 'github.svg' },
    ];

    interface SocialLink {
        url: string,
        icon: string
    }
</script>

<div class="flex flex-row justify-start items-center w-full h-[4.5rem] bg-slate-100 border-t-2 border-gray-200">
    <h1 class="flex-1 px-5 text-2xl text-left">&copy; IzMichael 2023 - Produced for L2-DGT</h1>

    <div id="social-gradient" class="flex flex-row items-center justify-around flex-1 h-full px-[2%] gap-[2%]">
        {#each socials as link}
            <a class="group flex items-center justify-center h-full px-10 flex-1" href={link.url}>
                <img src="/assets/icons/{link.icon}" alt="Icon" class="invert h-10 w-10 aspect-square group-hover:invert-[70%]">
            </a>
        {/each}
    </div>
</div>

<style>
    #social-gradient {
        background: linear-gradient(120deg, rgb(241, 245, 249) 5%,#1DA1F2 7%, #1DA1F2 27%, #4267B2 29%, #4267B2 49%, #E1306C 51%, #E1306C 71%, #000000 73%, #000000 93%, rgb(241, 245, 249) 95%);
    }
</style>