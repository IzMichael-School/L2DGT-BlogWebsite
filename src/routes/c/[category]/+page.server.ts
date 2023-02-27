import { pb } from '$lib/stores';
import type { Post, LoadObject, Category } from '$lib/types';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load({ params }: LoadObject) {
    // Fetch all posts, in batches of 10
    const postlist = await pb.collection('postList').getFullList<Post>(10, {
        // Only return posts published before now (scheduling), in the current category
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}" && category.slug = "${params?.category}"`,
        // Also return the category and author data for each post
        expand: 'category,author'
    });
    const posts: Post[] = postlist.map(a => { return JSON.parse(JSON.stringify(a)); });

    // Get category from URL param
    const categorymatches = await pb.collection('categories').getFullList<Category>(2, {
        filter: `slug = "${params?.category}"`
    });

    // Map category array to single object
    const category = categorymatches[0];
    
    // Validate category response, return data or throw error
    if (category?.name?.length > 0) {
        return {
            posts: [...posts],
            category: JSON.parse(JSON.stringify(category)),
            total: postlist.length
        };
    } else {
        throw error(404, JSON.stringify({
            detail: 'Category link is invalid',
            suggestion: 'Try checking the spelling in the link, or <a href="/">Return Home</a>.'
        }));
    };
};