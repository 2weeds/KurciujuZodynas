import { Admin } from "../../domain/Admin";
import { AdminGateway } from "../api/AdminGateway";

export class InMemoryAdminGateway implements AdminGateway {
    private readonly adminAccounts: Admin[];

    constructor() {
        this.adminAccounts = new Array();
        this.adminAccounts.push(new Admin());
    }

    checkAdminCredentials(username: string, password: string): string | void {
        if (this.areCredentialsCorrect(username, password))
            return "User " + username + " access granted";
        throw new Error("Unauthorized user");
    }

    private areCredentialsCorrect(username: string, password: string): boolean {
        for (let i = 0; i < this.adminAccounts.length; i++)
            if (this.adminAccounts[i].getUsername() === username && this.adminAccounts[i].getPassword() === password)
                return true;
        return false;
    }
}