import { pb } from '$lib/stores';
import type { Post, LoadObject } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }: LoadObject) {
    const posts = await pb.collection('posts').getFullList<Post>(400, {
        filter: `slug = "${params?.slug}"`,
        expand: 'category,author'
    });
    if (posts.length == 1) {
        const post: Post = JSON.parse(JSON.stringify(posts[0]));
        return {...post};
    } else {
        throw error(404, JSON.stringify({
            detail: 'Post link is invalid',
            suggestion: 'Try checking the spelling in the link, or <a href="/">Return Home</a>.'
        }));
    };
};