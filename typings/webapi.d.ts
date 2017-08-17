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
