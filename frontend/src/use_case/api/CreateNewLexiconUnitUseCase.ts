import { Observable } from "rxjs";

export interface CreateNewLexiconUnitUseCase {
    create(word: string, abbreviation: string, file: File, token: string | undefined): Observable<void>;
}