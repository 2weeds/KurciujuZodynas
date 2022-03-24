export interface AdminGateway {
    checkAdminCredentials(username: string, password: string): string;
}