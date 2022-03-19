import { Request, Response } from "express";
import { CreateNewLexiconUnitUseCase } from "../../use_case/api/CreateNewLexiconUnitUseCase";

export class CreateNewLexiconUnitRoute {
    private readonly useCase: CreateNewLexiconUnitUseCase;

    constructor(useCase: CreateNewLexiconUnitUseCase) {
        this.useCase = useCase;
    }

    create(req: Request, res: Response): void {
        const data = req.body;
        try {
            this.useCase.create(data.unit, data.abbreviation);
            res.sendStatus(201);
        } catch (e) {
            res.sendStatus(400)
        }
    }
}