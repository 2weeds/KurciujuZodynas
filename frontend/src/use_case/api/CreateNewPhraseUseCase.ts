import { Observable } from "rxjs";

export interface CreateNewPhraseUseCase {
    create(phrase: string, token: string | undefined): Observable<void>;
}