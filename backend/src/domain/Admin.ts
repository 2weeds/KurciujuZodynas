export class Admin {
    private readonly username: string;
    private readonly password: string;

    constructor() {
        this.username = "root";
        this.password = "root";
    }

    getUsername() { return this.username; }

    getPassword() { return this.password; }
}