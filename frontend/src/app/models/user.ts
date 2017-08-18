export class IUser {
    constructor(
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public gender: string,
        public birthday: string,
        public _id?: string,
        public position?: number,
        public isCoach?: boolean,
        public isAdmin?: boolean,
        public weight?: string,
        public height?: string,
        public salt?: string,
        public googleID?: string,
        public facebookID?: string,
        public twitterID?: string,
        public follow?: any[],
        public userPhoto?: string,
        public requestForCoaching?: boolean,
        public secondaryEmails?: string[],
        public settings?: {
            weight: string,
            trainingWeight: string,
            distance: string,
            temperature: string,
            timeFormat: string,
            timeZone: string,
            dateFormat: string,
            startWeek: string,
        }
    ) { }
}
