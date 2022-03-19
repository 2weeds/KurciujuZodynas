import { AuthorizeAdministratorController } from "../../../controller/AuthorizeAdministratorController";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";

export default function useAdminLoginWindow(
    authorizeAdministratorController: AuthorizeAdministratorController,
    setResponse: (admin: ViewAdminResponse) => void
  ): (username: string, password: string) => void {
    const authorize = (username: string, password: string) => {
        authorizeAdministratorController.authorize(username, password).subscribe(setResponse);
    };
  
    return authorize;
  }