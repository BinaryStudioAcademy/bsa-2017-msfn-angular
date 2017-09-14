export interface IEvent {
    title: string;
    creator: string;
    startDate: Date;
    endDate?: Date;
    dateCreated?: Date;
    location?: {
        name: string,
        coords: {
            lat: number,
            lng: number
        }
    };
    description?: string,
    image?: string;
    participants?: [string];
    followers?: [string];
    messages?: [string];
    isRemoved?: boolean;
}
