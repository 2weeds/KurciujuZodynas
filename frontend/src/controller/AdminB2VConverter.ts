import { BoundaryAdmin } from "../use_case/model/BoundaryAdmin";
import { ViewAdminResponse } from "./model/ViewAdminResponse";

export class AdminB2VConverter {
    convert(admin: BoundaryAdmin): ViewAdminResponse {
        return new ViewAdminResponse(admin.token);
    }
}