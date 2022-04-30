import { map, Observable } from "rxjs";
import { LexiconUnit } from "../domain/LexiconUnit";
import { SendLexiconUnitsToExportUseCase} from '../use_case/api/SendLexiconUnitsToExportUseCase';


export class SendLexiconUnitsToExportController {
  private readonly uc: SendLexiconUnitsToExportUseCase;

  constructor(uc: SendLexiconUnitsToExportUseCase) {
    this.uc = uc;
  }
  send(lexiconUnitsArray:LexiconUnit[]): Observable<void> {
    return this.uc.send(lexiconUnitsArray);
  }
}