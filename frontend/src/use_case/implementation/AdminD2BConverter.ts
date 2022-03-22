import { Admin } from "../../domain/Admin";
import { BoundaryAdmin } from "../model/BoundaryAdmin";

export class AdminD2BConverter {
    convert(admin: Admin): BoundaryAdmin {
        return new BoundaryAdmin(admin.token);
    }
}