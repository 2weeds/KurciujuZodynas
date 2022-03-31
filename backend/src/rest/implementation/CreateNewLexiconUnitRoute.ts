import { Request, Response } from "express";
import { CreateNewLexiconUnitUseCase } from "../../use_case/api/CreateNewLexiconUnitUseCase";
import { tokenDecoder } from '../tokenDecoder';

export class CreateNewLexiconUnitRoute {
    private readonly useCase: CreateNewLexiconUnitUseCase;

    constructor(useCase: CreateNewLexiconUnitUseCase) {
        this.useCase = useCase;
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const headers = req.headers;
        try {
            if (await tokenDecoder(headers.authorization)) {
                this.useCase.create(data.word, data.abbreviation);
                res.sendStatus(201);
            } else {
                res.status(400).json("Unauthorized");
            }
        } catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}