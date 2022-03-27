import { Observable } from "rxjs";
import { ADMIN_AUTHORIZATION_PATH } from "../../RouteConstants";
import { AdminGateway } from "../api/AdminGateway";
import { Client } from "../api/Client";

export class RestAdminGateway implements AdminGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  authorizeAdmin(username: string, password: string): Observable<string> {
    const body = {
      username: username,
      password: password,
    };
    return this.client.post<string>(ADMIN_AUTHORIZATION_PATH, body);
  }
}