export interface IHttpReq {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    failMessage?: string;
    successMessage?: string;
    headers?: any;
}
