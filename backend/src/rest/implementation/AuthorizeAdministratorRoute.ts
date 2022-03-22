import { Request, Response } from "express";
import { AuthorizeAdministratorUseCase } from "../../use_case/api/AuthorizeAdministratorUseCase";

export class AuthorizeAdministratorRoute {
    private readonly authorizationUC: AuthorizeAdministratorUseCase;

    constructor(authorizationUC: AuthorizeAdministratorUseCase) {
        this.authorizationUC = authorizationUC;
    }

    authorize(req: Request, res: Response): void {
        const data = req.body;
        try {
            const response = this.authorizationUC.authorize(data.username, data.password);
            res.status(200).json(response);
        } catch (e) {
            const err = e as Error
            res.status(400).json(err.message);
        }
    }
}