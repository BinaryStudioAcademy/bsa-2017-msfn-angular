export class IHttpReq {
    constructor(
        public url: string,
        public method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        public body: any,
        public failMessage?: string,
        public successMessage?: string,
        public headers?: any,
    ) { }
}
