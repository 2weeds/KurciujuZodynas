import { Observable } from "rxjs";

export interface CreateNewPhraseUseCase {
    create(phrase: string, file: File, token: string | undefined): Observable<void>;
}