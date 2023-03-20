import { pb } from '$lib/stores';
import type { Post, Author } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load() {
    const postlist = await pb.collection('posts').getList<Post>(1, 5, {
        filter: `publishedAt < "${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
        sort: '-publishedAt',
        expand: 'category,author'
    });
    const posts: Post[] = postlist.items.map(a => { return JSON.parse(JSON.stringify(a)); });

    const authorlist = await pb.collection('authors').getFullList<Author>(5, {
        sort: '-username'
    });
    const authors: Author[] = authorlist.map(a => { return JSON.parse(JSON.stringify(a)); });
    
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
        const data = await request.formData();

        const token = data.get('cf-turnstile-response');
        if (!token) return {
            error: 'Invalid CAPTCHA',
        };

        const { success, error } = await validateToken(token.toString(), SECRET_KEY);

        if (!success) return {
            error: error || 'Invalid CAPTCHA',
        };

        // const json = Object.assign(...Array.from(data.entries(), ([x,y]) => ({[x]:y})));
        const json = Object.fromEntries(data.entries());
        delete json['cf-turnstile-response'];
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
    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                response: token,
                secret: secret,
            }),
        },
    );

    const data: TokenValidateResponse = await response.json();

    return {
        // Return the status
        success: data.success,

        // Return the first error if it exists
        error: data['error-codes']?.length ? data['error-codes'][0] : null,
    };
};