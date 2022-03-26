import { Request, Response } from "express";
import { CreateNewPhraseUseCase } from "../../use_case/api/CreateNewPhraseUseCase";

export class CreateNewPhraseRoute {
    private readonly useCase: CreateNewPhraseUseCase;

    constructor(useCase: CreateNewPhraseUseCase) {
        this.useCase = useCase;
    }

    create(req: Request, res: Response): void {
        const data = req.body;
        try {
            this.useCase.create(data.phrase);
            res.sendStatus(201);
        } catch (e) {
            const err = e as Error;
            res.send(400).json(err.message)
        }
    }
}