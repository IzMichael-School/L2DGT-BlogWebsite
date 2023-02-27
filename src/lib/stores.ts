import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const pb: PocketBase = new PocketBase('https://l2dgt-blog-db.school.izmichael.com');

export const darkmode: Writable<boolean> = writable(false);