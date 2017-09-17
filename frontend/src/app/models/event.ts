export interface IEvent {
    title: string;
    creator: any;
    startDate: Date;
    _id?: string;
    endDate?: Date;
    dateCreated?: Date;
    location?: {
        name: string,
        coords: {
            lat: number,
            lng: number
        }
    };
    description?: string;
    image?: string;
    participants?: [any];
    followers?: [any];
    // messages?: [any];
    isRemoved?: boolean;
    startDateOutput?: string;
    endDateOutput?: string;
    isParticipating?: boolean;
    isFollowing?: boolean;
}
