import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";

export interface SendPhrasesToExportUseCase {
    send(lexiconUnitsArray:Phrase[]): Observable<void>;
}