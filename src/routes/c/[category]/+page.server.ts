import { pb } from '$lib/stores';
import type { Post, LoadObject } from '$lib/types';
import dayjs from 'dayjs';

export async function load({ params }: LoadObject) {
    const postlist = await pb.collection('posts').getFullList<Post>(400, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.path = "${params.category}"`,
        expand: 'category,author'
    });
    const posts: Post[] = postlist.map(a => { return JSON.parse(JSON.stringify(a)); });
    console.log(posts);
    return {
        posts: [...posts]
    };
};