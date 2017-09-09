export interface IPost {
    userId: string;
    date: Date;
    body: string;
    _id?: string;
    isRemoved?: boolean;
}
