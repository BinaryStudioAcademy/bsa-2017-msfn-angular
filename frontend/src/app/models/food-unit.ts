export interface IFoodUnit {
    id?: string;
    name: string;
    kcal: number;
    protein: string;
    fat: string;
    carbons: string;
    vendor?: string;
    customUserId: string;
    isRemoved?: boolean;
}
