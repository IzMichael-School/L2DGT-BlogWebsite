import { pb } from '$lib/stores';
import type { Category, LoadObject } from '$lib/types';

export async function load({ url }: LoadObject) {
    const categorylist = await pb.collection('categories').getFullList<Category>(400);
    const categories: Category[] = categorylist.map(a => { return {...a}; });
    return {
        categories: [...categories],
        currentPath: url?.pathname
    };
};