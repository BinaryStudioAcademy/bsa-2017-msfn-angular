declare module WebApi {
    export interface IWindow extends Window {
        _injectedData: IInjectedData;
    }
    export interface IInjectedData {
        isLoggedIn: boolean;
        userId: string;
        userFirstName: string;
        userLastName: string;
        role: string;
    }
}