export class ViewAdminResponse {
    readonly token: string;

    constructor(token: string) {
        this.token = token;
    }
}