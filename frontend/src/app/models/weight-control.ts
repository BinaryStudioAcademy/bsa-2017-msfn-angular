export class IWeightControl {
    constructor(
        public weight: number,
        public boneWeight: number,
        public waterPct: number,
        public fatPct: number,
        public date: string
    ) { }
}
