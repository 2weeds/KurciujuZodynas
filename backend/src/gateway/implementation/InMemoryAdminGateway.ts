import { Admin } from "../../domain/Admin";
import { AdminGateway } from "../api/AdminGateway";

export class InMemoryAdminGateway implements AdminGateway {
    private readonly adminAccounts: Admin[];

    constructor() {
        this.adminAccounts = new Array();
        this.adminAccounts.push(new Admin());
    }

    checkAdminCredentials(username: string, password: string): string {
        if (this.areCredentialsCorrect(username, password))
            return this.generateRandomSessionToken();
        throw new Error("User credentials not found");
    }

    private areCredentialsCorrect(username: string, password: string): boolean {
        for (let i = 0; i < this.adminAccounts.length; i++)
            if (this.adminAccounts[i].getUsername() === username && this.adminAccounts[i].getPassword() === password)
                return true;
        return false;
    }

    private generateRandomSessionToken() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
}