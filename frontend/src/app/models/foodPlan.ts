export interface IFoodPlan {
    _id?: string;
    title: string;
    kind: 'weekly' | 'daily';
    days: [{
        kcal: number,
        name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
        meals: [{
            kcal: number,
            name: string,
            products: [{
                kcal: number,
                name: string,
                quantity: number,
                _id: string,
            }]
        }]
    }];
    meals: [{
        kcal: number,
        name: string,
        products: [{
            kcal: number,
            name: string,
            quantity: number,
            _id: string,
        }]
    }];
}
