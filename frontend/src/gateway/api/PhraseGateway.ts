import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
  createNewPhrase(phrase: string, token: string | undefined): Observable<void>;

  retrieveAllPhrases(): Observable<Phrase[]>;
}