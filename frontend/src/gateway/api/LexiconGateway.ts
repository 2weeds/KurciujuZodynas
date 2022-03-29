import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconGateway {
  createNewLexiconUnit(word: string, abbreviation: string, token: string | undefined): Observable<void>;

  retrieveAllLexiconUnits(): Observable<LexiconUnit[]>;
}