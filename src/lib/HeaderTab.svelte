<script lang="ts">
    import { goto } from '$app/navigation';
    export let title: string, color: string, url: string;

    // Colours
    function invertColor(hex: string, bw = true): string {
        if (hex.indexOf('#') == 0) {
            hex = hex.slice(1);
        };
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        };
        if (hex.length !== 6) {
            console.warn('Invalid HEX color:', hex + '.', 'Using default fallback.');
            hex = '#3b82f6';
        };
        let r: number = parseInt(hex.slice(0, 2), 16),
            g: number = parseInt(hex.slice(2, 4), 16),
            b: number = parseInt(hex.slice(4, 6), 16);
        if (bw) {
        // https://stackoverflow.com/a/3943023/112731
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        };
        // invert color components
        let r2: string = (255 - r).toString(16),
            g2: string = (255 - g).toString(16),
            b2: string = (255 - b).toString(16);
        // pad each with zeros and return
        return '#' + padZero(r2) + padZero(g2) + padZero(b2);
    };

    function padZero(str: string, len?: number): string {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    };
</script>

<button class="p-2 h-12 self-end px-10 rounded-t-xl min-w-fit flex-1 ml-4 font-bold" style="background-color: {color}; color: {invertColor(color)};" on:click={() => goto(url)}>{title}</button>

<style>
    
</style>

