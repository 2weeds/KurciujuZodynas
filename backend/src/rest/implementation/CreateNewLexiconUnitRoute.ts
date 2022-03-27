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
            this.useCase.create(data.word, data.abbreviation, data.token);
            res.sendStatus(201);
        } catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}