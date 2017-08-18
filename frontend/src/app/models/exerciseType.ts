export class IExerciseType {
    constructor(
        public name: string,
        public code: number,
        public isRemoved?: boolean,
        public _id?: string
    ) { }
}
