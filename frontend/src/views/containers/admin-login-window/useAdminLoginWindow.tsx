import { AuthorizeAdministratorController } from "../../../controller/AuthorizeAdministratorController";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { useAdminLoginObserver } from "../observer/useAdminLoginObserver";

export default function useAdminLoginWindow(
    authorizeAdministratorController: AuthorizeAdministratorController,
    setResponse: (admin: ViewAdminResponse) => void
  ): (username: string, password: string) => void {
    const observer = useAdminLoginObserver(setResponse);
    const authorize = (username: string, password: string) => {
        authorizeAdministratorController.authorize(username, password).subscribe(observer);
    };
  
    return authorize;
  }