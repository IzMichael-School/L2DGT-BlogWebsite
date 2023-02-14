<svelte:head>
    <title>Svelte App</title>
</svelte:head>

<script>
    export let data;

    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';

    import { auth } from '$lib/stores.js';
</script>

<Header />

<Footer />

<style>
    
</style>