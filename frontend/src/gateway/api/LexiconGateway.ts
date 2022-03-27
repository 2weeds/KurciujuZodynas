import { Observable } from "rxjs";

export interface LexiconGateway {
  createNewLexiconUnit(word: string, abbreviation: string, token: string | undefined): Observable<void>;
}