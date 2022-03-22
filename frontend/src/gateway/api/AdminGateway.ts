import { Observable } from "rxjs";
import { Admin } from "../../domain/Admin";

export interface AdminGateway {
  authorizeAdmin(username: string, password: string): Observable<Admin>;
}