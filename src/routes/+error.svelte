<svelte:head>
    <title>Iz's Devlog: Error {$page.status}</title>
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
</div>

<style>
    
</style>