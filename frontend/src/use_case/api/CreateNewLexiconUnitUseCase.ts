import { Observable } from "rxjs";

export interface CreateNewLexiconUnitUseCase {
    create(word: string, abbreviation: string): Observable<void>;
}