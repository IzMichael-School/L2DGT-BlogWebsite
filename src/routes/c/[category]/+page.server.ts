import { pb } from '$lib/stores';
import type { Post, LoadObject, Category } from '$lib/types';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load({ params }: LoadObject) {
    const start = new Date();
    console.log('1');
    const postlist = await pb.collection('posts').getFullList<Post>(10, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.slug = "${params?.category}"`,
        expand: 'category,author'
    });
    console.log('2');
    const posts: Post[] = postlist.map(a => { return JSON.parse(JSON.stringify(a)); });
    console.log('3');
    const totalReq = await pb.collection('posts').getList(1, 1, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.slug = "${params?.category}"`
    });
    console.log('4');

    const categorymatches = await pb.collection('categories').getFullList<Category>(2, {
        filter: `slug = "${params?.category}"`
    });
    console.log('5');

    const category = categorymatches[0];
    
    console.log('6');
    if (category?.name?.length > 0) {
        console.log('7');
        console.log('Loaded in', new Date().getTime() - start.getTime(), 'ms');
        return {
            posts: [...posts],
            category: JSON.parse(JSON.stringify(category)),
            total: totalReq.totalItems
        };
    } else {
        console.log('8');
        throw error(404, JSON.stringify({
            detail: 'Category link is invalid',
            suggestion: 'Try checking the spelling in the link, or <a href="/">Return Home</a>.'
        }));
    };
};