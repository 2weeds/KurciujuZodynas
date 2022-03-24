import { BoundaryAdmin } from "./entity/BoundaryAdmin";

export interface AuthorizeAdministratorUseCase {
    authorize(username: string, password: string): BoundaryAdmin;
}