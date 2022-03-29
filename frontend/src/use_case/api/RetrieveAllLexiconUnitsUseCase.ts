import { Observable } from "rxjs";
import { BoundaryLexiconUnit } from "../model/BoundaryLexiconUnit";

export interface RetrieveAllLexiconUnitsUseCase {
    retrieve(): Observable<BoundaryLexiconUnit[]>;
}