export interface Post {
    id: string,
    slug: string,
    title: string,
    publishedAt: string,
    content: string
};

export interface Category {
    id: string,
    name: string,
    color: string,
    path: string
};

export interface LoadObject {
    params: {
        slug?: string,
        category?: string
    }
};