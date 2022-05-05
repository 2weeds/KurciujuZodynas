import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";

export interface SendLexiconUnitsToExportUseCase {
    send(lexiconUnitsArray:LexiconUnit[]): Observable<void>;
}