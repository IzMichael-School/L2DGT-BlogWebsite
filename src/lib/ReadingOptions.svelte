<script lang="ts">
    // Import Component Attributes
    import { postStyle } from '$lib/stores';

    // Import portal library
    import { portal } from 'svelte-portal';

    // Create arrays of page option values
    let bgColors = [
            { value: '#FAFAFA', label: 'Salt' },
            { value: '#F1E9D2', label: 'Parchment' },
            { value: '#C1B48A', label: 'Dark Parchment' }
        ], fonts = [
            { value: 'IBM Plex Sans', label: 'IBM Plex Sans', fallback: 'sans-serif' },
            { value: 'Inter', label: 'Inter', fallback: 'sans-serif' },
            { value: 'Playfair Display', label: 'Playfair Display', fallback: 'serif' },
            { value: 'Roboto Mono', label: 'Roboto Mono', fallback: 'monospace' }
        ], fontSizes = [
            { value: '0.5rem', label: 'Extra Small' },
            { value: '0.75rem', label: 'Small' },
            { value: '1rem', label: 'Base' },
            { value: '1.5rem', label: 'Large' },
            { value: '2rem', label: 'Medium' },
            { value: '2.5rem', label: 'Extra Large' }
        ], pageWidths = [
            { value: '50%', label: 'Half', symbol: '½' },
            { value: '66.6%', label: 'Two Thirds', symbol: '⅔' },
            { value: '75%', label: 'Three Quarters', symbol: '¾' },
            { value: '100%', label: 'Full', symbol: '1' }
        ];
    
    // Component event generation
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="w-screen h-screen overflow-hidden flex justify-center items-center absolute inset-0 z-[100000] bg-black/50" use:portal={'#site'}>
    <div class="w-3/4 h-3/4 bg-white shadow-xl rounded-lg relative p-5 flex flex-col justify-center items-center">
        <!-- Modal close button -->
        <button class="p-2 absolute top-0 right-0 hover:invert-[0.5]" on:click={() => dispatch('close')}>
            <img src="/assets/icons/cross.svg" class="w-8 h-8 aspect-square" alt="Cross Icon" />
        </button>

        <h1 class="text-3xl font-bold mb-10">Reading Options</h1>
        <div class="flex flex-row justify-center items-center w-full gap-10">
            <div class="flex flex-col justify-start items-center h-full flex-1">
                <h2 class="text-xl font-bold mb-3">Page Colour</h2>
                {#each bgColors as color}
                    <button class="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-lg flex flex-row justify-center items-center w-full" on:click={() => $postStyle.backgroundColor = color.value}>
                        <span class="w-8 h-8 mr-2 rounded-md aspect-square border-2 border-gray-300" style="background-color: {color.value};"></span>
                        <h3 class="text-lg text-right flex-1">{color.label}</h3>
                    </button>
                {/each}
            </div>
            <div class="flex flex-col justify-start items-center h-full flex-1">
                <h2 class="text-xl font-bold mb-3">Font Size</h2>
                {#each fontSizes as size}
                    <button class="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-lg flex flex-row justify-center items-center w-full" on:click={() => $postStyle.fontSize = size.value}>
                        <span class="w-14 h-14 flex flex-col justify-center items-center mr-2 rounded-md aspect-square border-2 border-gray-300 bg-gray-100" style="font-size: {size.value};">Aa</span>
                        <h3 class="text-lg text-right flex-1">{size.label}</h3>
                    </button>
                {/each}
            </div>
            <div class="flex flex-col justify-start items-center h-full flex-1">
                <h2 class="text-xl font-bold mb-3">Font Style</h2>
                {#each fonts as font}
                    <button class="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-lg flex flex-row justify-center items-center w-full" on:click={() => $postStyle.fontFamily = `${font.value}, ${font.fallback}`} style="font-family: {font.value}, {font.fallback};">
                        <span class="w-8 h-8 flex flex-col justify-center items-center mr-2 rounded-md aspect-square border-2 border-gray-300 bg-gray-100">Aa</span>
                        <h3 class="text-lg text-right flex-1">{font.label}</h3>
                    </button>
                {/each}

                <h2 class="text-xl font-bold mb-3 mt-7">Page Width</h2>
                {#each pageWidths as width}
                    <button class="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-lg flex flex-row justify-center items-center w-full" on:click={() => $postStyle.width = width.value}>
                        <span class="w-8 h-8 flex flex-col justify-center items-center mr-2 rounded-md aspect-square border-2 border-gray-300 bg-gray-100">{width.symbol}</span>
                        <h3 class="text-lg text-right flex-1">{width.label}</h3>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    
</style>