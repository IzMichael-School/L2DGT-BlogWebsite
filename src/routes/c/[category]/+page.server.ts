import { pb } from '$lib/stores';
import type { Post, LoadObject, Category } from '$lib/types';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load({ params }: LoadObject) {
    const postlist = await pb.collection('posts').getFullList<Post>(10, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.slug = "${params?.category}"`,
        expand: 'category,author'
    });
    const posts: Post[] = postlist.map(a => { return JSON.parse(JSON.stringify(a)); });
    const totalReq = await pb.collection('posts').getList(1, 1, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.slug = "${params?.category}"`
    });

    const categorymatches = await pb.collection('categories').getFullList<Category>(2, {
        filter: `slug = "${params?.category}"`
    });

    const category = categorymatches[0];
    
    if (category?.name?.length > 0) {
        return {
            posts: [...posts],
            category: JSON.parse(JSON.stringify(category)),
            total: totalReq.totalItems
        };
    } else {
        throw error(404, JSON.stringify({
            detail: 'Category link is invalid',
            suggestion: 'Try checking the spelling in the link, or <a href="/">Return Home</a>.'
        }));
    };
};