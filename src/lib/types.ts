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
    slug: string
};

export interface DBUser {
    id: string,
    username: string,
    email: string,
    created: Date
};

export interface Author extends DBUser {
    avatar: string,
    bio: string
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
    params?: {
        slug?: string,
        category?: string
    },
    url?: URL
};

export interface Anchor {
    name: string,
    id: string,
    heading: HTMLElement
};

export interface PostStyle {
    backgroundColor: string,
    fontSize: string,
    fontFamily: string,
    width: string
};