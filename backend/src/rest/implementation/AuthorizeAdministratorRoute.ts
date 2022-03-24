import { Request, Response } from "express";
import { AuthorizeAdministratorUseCase } from "../../use_case/api/AuthorizeAdministratorUseCase";
import { BoundaryAdmin } from "../../use_case/api/entity/BoundaryAdmin";
import { RestAdmin } from "../api/entity/RestAdmin";

export class AuthorizeAdministratorRoute {
    private readonly authorizationUC: AuthorizeAdministratorUseCase;

    constructor(authorizationUC: AuthorizeAdministratorUseCase) {
        this.authorizationUC = authorizationUC;
    }

    authorize(req: Request, res: Response): void {
        const data = req.body;
        try {
            const response = this.authorizationUC.authorize(data.username, data.password);
            const convertedResponse = this.convertToRest(response);
            res.status(200).json(convertedResponse);
        } catch (e) {
            const err = e as Error
            res.status(400).json(err.message);
        }
    }

    private convertToRest(boundaryAdmin: BoundaryAdmin): RestAdmin {
        return new RestAdmin(boundaryAdmin.token);
    }
}