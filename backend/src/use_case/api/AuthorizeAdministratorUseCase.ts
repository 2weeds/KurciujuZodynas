export interface AuthorizeAdministratorUseCase {
    authorize(username: string, password: string): string | void;
}