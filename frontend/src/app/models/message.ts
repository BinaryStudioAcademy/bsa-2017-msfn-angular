export interface IMessage {
    date: Date;
    body: string;
    userId?: string;
    _id?: string;
    isRemoved?: boolean;
}
