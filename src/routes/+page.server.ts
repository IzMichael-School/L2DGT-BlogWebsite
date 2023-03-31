import { pb } from '$lib/stores';
import type { Post, Author } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load() {
    // Fetch most recent 5 posts
    const postlist = await pb.collection('posts').getList<Post>(1, 5, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
        sort: '-publishedAt',
        expand: 'category,author'
    });
    // Convert to POJOs
    const posts: Post[] = postlist.items.map(a => { return JSON.parse(JSON.stringify(a)); });

    // Fetch all authors
    const authorlist = await pb.collection('authors').getFullList<Author>(5, {
        sort: '-username'
    });
    // Convert to POJOs
    const authors: Author[] = authorlist.map(a => { return JSON.parse(JSON.stringify(a)); });
    
    // Validate post array length, throw error if not
    if (posts.length > 0) {
        return {
            posts: [...posts],
            authors: [...authors]
        };
    } else {
        throw error(404, JSON.stringify({
            detail: 'Post Fetching Failed',
            suggestion: 'Please try again later.'
        }));
    };
};

const SECRET_KEY = '0x4AAAAAAADMCwPQaCcCtTeavWzMH3fcC4E';
export const actions = {
    default: async ({ request }: RequestEvent) => {
        // Get input data from form
        const data = await request.formData();

        // Check if turnstile was submitted
        const token = data.get('cf-turnstile-response');
        if (!token) return {
            // Captcha is more common name, so return that for UX simplicity
            error: 'Invalid CAPTCHA',
        };

        // Check if CF token is valid
        const { success, error } = await validateToken(token.toString(), SECRET_KEY);

        if (!success) return {
            // Captcha is more common name, so return that for UX simplicity
            error: error || 'Invalid CAPTCHA',
        };

        // Convert JS Formdata object to JSON
        const json = Object.fromEntries(data.entries());
        delete json['cf-turnstile-response'];

        // Submit form to database
        await pb.collection('contactform').create(json);
    }
};

interface TokenValidateResponse {
    'error-codes': string[];
    success: boolean;
    action: string;
    cdata: string;
};

async function validateToken(token: string, secret: string) {
    // Check if CF Token is valid
    const data: TokenValidateResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            response: token,
            secret: secret,
        }),
    }).then(res => { return res.json(); });

    return {
        // Return the status
        success: data.success,

        // Return the first error if it exists
        error: data['error-codes']?.length ? data['error-codes'][0] : null,
    };
};