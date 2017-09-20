export interface ITribe {
    _id?: string;
    creator?: string;
    name: string;
    image?: string;
    description?: string;
    members?: string[];
    banned?: string[];
    postWithOwnName?: boolean;
}
