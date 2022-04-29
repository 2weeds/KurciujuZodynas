import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";

export interface SendAllLexiconUnitsUseCase {
    send(lexiconUnitsArray:LexiconUnit[]): Observable<void>;
}