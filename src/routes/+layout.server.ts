import { pb } from '$lib/stores';
import type { Category, LoadObject } from '$lib/types';

export async function load({ url }: LoadObject) {
    // Fetch all categories
    const categorylist = await pb.collection('categories').getFullList<Category>(400);
    // Convert to POJOs
    const categories: Category[] = categorylist.map(a => { return {...a}; });
    // Return list, plus current path for transitionary purposes
    return {
        categories: [...categories],
        currentPath: url?.pathname
    };
};