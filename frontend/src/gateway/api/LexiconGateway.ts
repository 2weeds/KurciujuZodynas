import { Observable } from "rxjs";

export interface LexiconGateway {
  createNewLexiconUnit(word: string, abbreviation: string): Observable<void>;
}