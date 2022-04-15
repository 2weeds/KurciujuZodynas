import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { BoundaryLexiconUnit } from "../api/entity/BoundaryLexiconUnit";
import { RetrieveAllLexiconUnitsUseCase } from "../api/RetrieveAllLexiconUnitsUseCase";

export class RetrieveAllLexiconUnitsInteractor implements RetrieveAllLexiconUnitsUseCase {
    private readonly lexiconGW: LexiconUnitGateway;

    constructor(lexiconGW: LexiconUnitGateway) {
        this.lexiconGW = lexiconGW;
    }
    
    retrieve(): BoundaryLexiconUnit[] {
        return this.lexiconGW.retrieveAll().map(element => this.convertD2BUnit(element));
    }

    private convertD2BUnit(unit: LexiconUnit): BoundaryLexiconUnit {
        return new BoundaryLexiconUnit(unit.getWord(), unit.getAbbreviation(), unit.getFile())
    }
}