export class ReturnType {
    status: 'ok' | 'error';
    data: any;

    constructor(
        status: 'ok' | 'error',
        data: any
    ) {
        this.status = status;
        this.data = data;
    }
}