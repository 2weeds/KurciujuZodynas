import { Request, Response } from "express";
import { BoundaryLexiconUnit } from "../../use_case/api/entity/BoundaryLexiconUnit";
import { RetrieveAllLexiconUnitsUseCase } from "../../use_case/api/RetrieveAllLexiconUnitsUseCase";
import { RestLexiconUnit } from "../api/entity/RestLexiconUnit";

export class RetrieveAllLexiconUnitsRoute {
    private readonly useCase: RetrieveAllLexiconUnitsUseCase;

    constructor(useCase: RetrieveAllLexiconUnitsUseCase) {
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

    private convertB2R(unit: BoundaryLexiconUnit): RestLexiconUnit {
        return new RestLexiconUnit(unit.getWord(), unit.getAbbreviation(), unit.getFile());
    }
}