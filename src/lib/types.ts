export interface Post {
    id: string,
    slug: string,
    title: string,
    content: string,
    snippet: string,
    publishedAt: string,
    category: string,
    image: URL,
    imageAlt: string,
    imageCaption: string,
    author: string,
    expand: {
        category: Category,
        author: DBUser
    }
};

export interface Category {
    id: string,
    name: string,
    color: string,
    path: string
};

export interface DBUser {
    id: string,
    username: string,
    email: string,
    created: Date
};

export interface Comment {
    id: string,
    content: string,
    reader: string,
    post: Post,
    expand: {
        reader: DBUser
    }
};

export interface LoadObject {
    params: {
        slug?: string,
        category?: string
    }
};

export interface Anchor {
    name: string,
    id: string,
    heading: HTMLElement
}