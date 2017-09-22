export interface ITribe {
    _id?: string;
    creator?: string;
    name: string;
    image?: string;
    description?: string;
    canPost?: string[];
    canComment?: string[];
    members?: string[];
    banned?: string[];
    postWithOwnName?: boolean;
}
