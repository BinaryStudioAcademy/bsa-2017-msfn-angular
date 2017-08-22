export interface INotification {
    title: string;
    message: string;
    callback?: Function;
    _id?: string;
    read?: boolean;
    isRemoved?: boolean;
}
