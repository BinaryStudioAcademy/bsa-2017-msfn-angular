export interface IMessage {
    date: Date;
    body: string;
    user?: string;
    _id?: string;
    event?: string;
    isRemoved?: boolean;
}
