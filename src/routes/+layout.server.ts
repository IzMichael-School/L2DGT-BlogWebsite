import { pb } from '$lib/stores';
import type { Category } from '$lib/types';

export async function load() {
    const categorylist = await pb.collection('categories').getFullList<Category>(400);
    const categories: Category[] = categorylist.map(a => { return {...a}; });
    return {
        categories: [...categories]
    };
};