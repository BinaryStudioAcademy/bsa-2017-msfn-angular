export interface IFoodType {
    id?: string;
    name: string;
    depthLvl: number,
    parentType: string,
    isRemoved: boolean;
    description?: string;
    picture?: string;
}
