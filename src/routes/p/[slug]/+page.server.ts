import { pb } from '$lib/stores';
import type { Post, LoadObject } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }: LoadObject) {
    // Fetch all posts with slug from URL param
    const posts = await pb.collection('posts').getFullList<Post>(400, {
        filter: `slug = "${params?.slug}"`,
        expand: 'category,author'
    });
    // Validate response, return data or throw error
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