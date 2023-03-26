<svelte:head>
    <title>Iz's Blog: Error {$page.status}</title>
</svelte:head>

<script lang="ts">
    import { page } from '$app/stores';
    let err = $page?.error?.message.startsWith('{') ? JSON.parse($page?.error?.message ?? '{}') : $page?.error?.message;
</script>

<div class="flex flex-col items-center justify-center w-full h-full">
    {#if $page?.error?.message.startsWith('{')}
    <h1 class="text-6xl font-bold">{$page.status} - {err.detail}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <h2 class="mt-1 text-2xl">{@html err.suggestion}</h2>
    {:else}
    <h1 class="text-6xl font-bold">{$page.status} - {err}</h1>
    <h2 class="mt-1 text-2xl">Check your URL again, or <a href="/">Return Home</a>.</h2>
    {/if}

    <h2 class="mt-16 text-2xl">Should this have worked? <a href="mailto:dgt-blog@izmichael.com?subject={encodeURIComponent('DGT Blog - Unexpected Error')}&cc=bugs@izmichael.com&body={encodeURIComponent('Hi! I tried to load ' + $page.url.toString() + ', but it gave me an error.')}">Email me at dgt-blog@izmichael.com</a>.</h2>
</div>

<style>
    a {
        color: rgb(106, 127, 219);
        font-weight: 600;
    }
</style>