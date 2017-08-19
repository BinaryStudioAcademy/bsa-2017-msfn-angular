declare module WebApi {
    export interface IWindow extends Window {
        _injectedData: IInjectedData;
    }

    export interface IInjectedData {
        isLoggedIn: boolean;
        userFirstName: string;
        userLastName: string;
        role: string;
        userPhoto: string;
        userId: string;
    }
}

declare module ExerciseApi {
    export interface IExerciseType {
        name?: string;
        code?: string;
        isRemoved?: string;
    }
}

declare module SubscribeApi {
    export interface ISubscribeUser {
        _id: string;
        firstName: string;
        lastName: string;
        userPhoto?: string;
    }
}

declare module MeasurementApi  {
    export interface IMeasurementType {
        id?: string;
        measureName: string;
        measureUnits?: Array<{
            id?: string
            unitName?: string;
            conversionFactor?: number;
            isRemoved?: boolean;
        }>;
    }
    export interface IMeasureUnit {
        id?: string;
        measureName?: string;
        unitName: string;
        conversionFactor?: number;
        isRemoved?: boolean;
    }
}
