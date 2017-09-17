export interface ITribe {
    creator?: string;
    name: string;
    description?: string;
    members?: string[];
    banned?: string[];
    postWithOwnName?: boolean;
}
