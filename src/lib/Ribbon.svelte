<script lang="ts">
    // Import Component Attributes
    export let color: string, width: string;
</script>

<!-- Ribbon tag element -->
<div class="ribbon" style="--color: {color}; --width: {width};">
    <!-- Svelte slot component -->
	<slot />
</div>

<style>
    /* Ribbon box styles */
    .ribbon {
        background: var(--color);
        display: block;
        width: var(--width);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    /* Ribbon inverse arrow styles */
    .ribbon:after {
        content: "";
        width: 100%;
        top: 100%;
        position: absolute;
        display: block;
        border-width: 0 calc(var(--width) / 2) calc(var(--width) / 2) calc(var(--width) / 2);
        border-color: var(--color);
        border-bottom-color: transparent;
        border-style: solid;
        box-sizing: border-box;
    }
</style>