export interface IFood {
    id?: string;
    name: string;
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
