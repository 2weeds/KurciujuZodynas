import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
  createNewPhrase(phrase: string, file: File, token: string | undefined): Observable<void>;
  sendPhrasesToExport(phrasesToExport: Phrase[]): Observable<void>;
  retrieveAllPhrases(): Observable<Phrase[]>;
}