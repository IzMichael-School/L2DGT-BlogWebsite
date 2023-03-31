// Import libraries, types
import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import type { Writable } from 'svelte/store';
import type { Anchor } from '$lib/types';

// Initialise Database SDK
export const pb: PocketBase = new PocketBase('https://l2dgt-blog-db.school.izmichael.com');
// Sidebar heading list
export const anchors: Writable<Anchor[]> = writable([]);
// Tab id for post view
export const tab: Writable<string> = writable('');

// Pick whether black or white contrasts better with the provided colour.
export function invertColor(hex: string, bw = true): string {
    // Remove starting hash
    if (hex.indexOf('#') == 0) {
        hex = hex.slice(1);
    };
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    };
    // Use fallback if invalid hex
    if (hex.length !== 6) {
        console.warn('Invalid HEX color:', hex + '.', 'Using default fallback.');
        hex = '#3b82f6';
    };
    // Convert hex to rgb
    const r: number = parseInt(hex.slice(0, 2), 16),
        g: number = parseInt(hex.slice(2, 4), 16),
        b: number = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // calculate contrast value
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    };
    // invert color components
    const r2: string = (255 - r).toString(16),
        g2: string = (255 - g).toString(16),
        b2: string = (255 - b).toString(16);
    // pad each with zeroes and return
    return '#' + padZero(r2) + padZero(g2) + padZero(b2);
};

// Pad string with zeroes
function padZero(str: string, len?: number): string {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
};