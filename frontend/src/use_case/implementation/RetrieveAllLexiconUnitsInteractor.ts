import { map, Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconGateway } from "../../gateway/api/LexiconGateway";
import { RetrieveAllLexiconUnitsUseCase } from "../api/RetrieveAllLexiconUnitsUseCase";
import { BoundaryLexiconUnit } from "../model/BoundaryLexiconUnit";

export class RetrieveAllLexiconUnitsInteractor implements RetrieveAllLexiconUnitsUseCase {
    private readonly lexiconGW: LexiconGateway;

    constructor(lexiconGW: LexiconGateway){
        this.lexiconGW = lexiconGW;
    }

    retrieve(): Observable<BoundaryLexiconUnit[]> {
        return this.lexiconGW
            .retrieveAllLexiconUnits()
            .pipe(map((unitArray) => this.convertD2B(unitArray)));
    }

    private convertD2B(unitArray: LexiconUnit[]): BoundaryLexiconUnit[] {
        const boundaryUnitArray: BoundaryLexiconUnit[] = [];
        unitArray.forEach(unit => boundaryUnitArray.push(unit));

        return boundaryUnitArray;
    }
}