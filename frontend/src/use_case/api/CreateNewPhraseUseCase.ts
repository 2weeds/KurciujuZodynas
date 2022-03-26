import { Observable } from "rxjs";

export interface CreateNewPhraseUseCase {
    create(phrase: string): Observable<void>;
}