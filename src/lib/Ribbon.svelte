<script lang="ts">
    export let color: string, width: string;
</script>

<div class="ribbon" style="--color: {color}; --width: {width};">
	<slot />
</div>

<style>
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