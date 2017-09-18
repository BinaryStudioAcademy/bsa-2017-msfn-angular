export interface IFoodType {
    id?: string;
    name: string;
    depthLvl: number;
    parentType: {
        _id: string,
        name: string,
        depthLvl: number
    };
    isRemoved: boolean;
    description?: string;
    picture?: string;
}
