<script lang="ts">
    export let label: string, click: () => void, color = '#1B998B';
    import { invertColor } from '$lib/stores';
</script>

<button class="btn group hover:bg-blue-500 bg-slate-300 shrink-0 w-full p-2 font-semibold text-left rounded-lg" style="--btn-color: {color};" on:click={click}>
    <span class={invertColor(color) == '#000000' ? ' invert group-hover:invert-0' : 'group-hover:invert'}>{label}</span>
</button>

<style>
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

    .btn:hover:before {
        transform: translateX(0);
    }
</style>

