export interface INotification {
    title: String;
    message: String;
    callback?: Function;
    _id?: String;
    read?: Boolean;
    isRemoved?: Boolean;
}
