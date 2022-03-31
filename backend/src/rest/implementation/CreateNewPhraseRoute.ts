import { Request, Response } from "express";
import { CreateNewPhraseUseCase } from "../../use_case/api/CreateNewPhraseUseCase";
import { tokenDecoder } from "../tokenDecoder";

export class CreateNewPhraseRoute {
    private readonly useCase: CreateNewPhraseUseCase;

    constructor(useCase: CreateNewPhraseUseCase) {
        this.useCase = useCase;
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const headers = req.headers;
        try {
            if (await tokenDecoder(headers.authorization)) {
                this.useCase.create(data.phrase);
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