import { Request, Response } from "express";
import { BoundaryPhrase } from "../../use_case/api/entity/BoundaryPhrase";
import { RetrieveAllPhrasesUseCase } from "../../use_case/api/RetrieveAllPhrasesUseCase";
import { RestPhrase } from "../api/entity/RestPhrase";

export class RetrieveAllPhrasesRoute {
    private readonly useCase: RetrieveAllPhrasesUseCase;

    constructor(useCase: RetrieveAllPhrasesUseCase) {
        this.useCase = useCase;
    }

    retrieve(req: Request, res: Response): void {
        try {
            const interactorResponse = this.useCase.retrieve();
            const restResponse = interactorResponse.map(element => this.convertB2R(element));
            res.status(200).json(restResponse);
        } catch (e) {
            const err = e as Error;
            res.status(500).json(err.message);
        }
    }

    private convertB2R(phrase: BoundaryPhrase): RestPhrase {
        return new RestPhrase(phrase.getPhrase(), phrase.getFile());
    }
}