export interface IFoodType {
    id?: string;
    foodType: string;
    foodUnits?: Array<{
        id?: string;
        name: string;
        kcal: number;
        protein: string;
        fat: string;
        carbons: string;
        vendor?: string;
        customUserId: string;
        isRemoved?: boolean;
    }>;
}
