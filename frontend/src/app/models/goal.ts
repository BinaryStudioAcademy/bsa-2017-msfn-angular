export interface IGoal {
    type: string;
    value: number;
    isRemoved: {
        type: boolean,
        def: boolean
    };
    deadline: Date;
    startTime: Date;
    createdByUser: string;
}
