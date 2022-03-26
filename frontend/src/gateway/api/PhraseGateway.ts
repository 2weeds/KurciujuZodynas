import { Observable } from "rxjs";

export interface PhraseGateway {
  createNewPhrase(phrase: string): Observable<void>;
}