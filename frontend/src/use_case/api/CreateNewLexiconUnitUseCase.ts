import { Observable } from "rxjs";

export interface CreateNewLexiconUnitUseCase {
    create(word: string, abbreviation: string, token: string | undefined): Observable<void>;
}