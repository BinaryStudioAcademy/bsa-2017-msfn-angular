declare module WebApi {
    export interface IWindow extends Window {
        _injectedData: IInjectedData;
    }
    export interface IInjectedData {
        isLoggedIn: boolean;
    }
}

declare module ExerciseApi {
    export interface IExerciseType {
        name?: string;
        code?: string;
        isRemoved?: string;
    }
}