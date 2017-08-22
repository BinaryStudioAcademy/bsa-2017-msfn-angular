export interface IUser {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    birthday: string;
    _id?: string;
    position?: number;
    isCoach?: boolean;
    isAdmin?: boolean;
    weight?: string;
    height?: string;
    salt?: string;
    googleID?: string;
    facebookID?: string;
    twitterID?: string;
    follow?: any[];
    userPhoto?: string;
    requestForCoaching?: boolean;
    secondaryEmails?: string[];
    settings?: {
        weight: string,
        trainingWeight: string,
        distance: string,
        temperature: string,
        timeFormat: string,
        timeZone: string,
        dateFormat: string,
        startWeek: string
    };
    weightControl?: {
        weight: number,
        boneWeight: number,
        waterPct: number,
        fatPct: number,
        date: string
    }[];
}
