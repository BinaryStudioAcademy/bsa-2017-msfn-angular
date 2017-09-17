export interface ITribePost {
    title: string;
    text: string;
    comments?: Array<{
        author: string,
        text: string,
    }>;
    image?: string;
    author?: string;
    tribe?: string;
    views?: number;
    createdAt?: string;
    isRemoved?: boolean;
}
