export interface IFood {
    _id?: string;
    name: string;
    measure: string;
    foodType: string;
    kcal?: number;
    protein?: number;
    fat?: number;
    carbons?: number;
    vendor?: string;
    description?: string;
    picture?: string;
    customUserId?: string;
    isRemoved?: boolean;
}
