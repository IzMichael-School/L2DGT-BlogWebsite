<script lang="ts">
    // Import Component Attributes
    export let label: string, click: () => void, color = '#1B998B';

    // Import Colour Inverter Function
    import { invertColor } from '$lib/stores';
</script>

<!-- Slide-In Button - Used for the "Read the Post ->" Button in Category View -->
<button class="btn group hover:bg-blue-500 bg-slate-300 shrink-0 w-full p-2 font-semibold text-left rounded-lg" style="--btn-color: {color};" on:click={click}>
    <!-- Text colour should be either black or white, depending on button colour -->
    <span class={invertColor(color) == '#000000' ? ' invert-0' : 'group-hover:invert'}>{label}</span>
</button>

<style>
    /* Styling for Button, needed for animation */
    .btn {
        position: relative;
        display: block;
        overflow: hidden;
        max-width: 100%;
        z-index: 1;

        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Colour block for animation */
    .btn:before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--btn-color);
        transform: translateX(-101%);
        transition-property: all;
        transition-duration: 500ms;
        transition-timing-function: ease-in-out;
        z-index: -1;
    }

    /* Colour block animation trigger */
    .btn:hover:before {
        transform: translateX(0);
    }
</style>

