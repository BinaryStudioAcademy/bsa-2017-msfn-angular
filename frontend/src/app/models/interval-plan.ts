export interface IIntervalPlan {
    circles: [ICircle];
}


export interface ICircle {
    exercises: [IIntervalExercise];
    restTime: number;
}

export interface IIntervalExercise {
    name: string;
    time?: number;
}
