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
        isRemoved?: boolean;
    }

    export interface IExercise {
        name: string;
        type: string;
        isRemoved: boolean;
        sportsId: string[];
        description: string;
        image: string;
    }
}

declare module GoalApi{
    export interface IGoal {
        name?: string;
        type?: string;
        isRemoved?: string;
    }
}

declare module SubscribeApi {
    export interface ISubscribeUser {
        _id: string;
        firstName: string;
        lastName: string;
        justUnsubscribe?: boolean;
        isFollowed?: boolean;
        userPhoto?: string;
    }
}
