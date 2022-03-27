import { Observable } from "rxjs";

export interface PhraseGateway {
  createNewPhrase(phrase: string, token: string | undefined): Observable<void>;
}