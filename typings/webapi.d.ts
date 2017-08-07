declare module global {
    interface Window {
        _injectedData: WebApi.IInjectedData;
    }
}

declare module WebApi {
    export interface IWindow extends Window {
        _injectedData: IInjectedData;
    }
    export interface IInjectedData {
        isLoggedIn: boolean;
    }
}