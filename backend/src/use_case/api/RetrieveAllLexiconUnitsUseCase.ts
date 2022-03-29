import { BoundaryLexiconUnit } from "./entity/BoundaryLexiconUnit";

export interface RetrieveAllLexiconUnitsUseCase {
    retrieve(): BoundaryLexiconUnit[];
}