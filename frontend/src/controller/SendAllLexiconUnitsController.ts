import { map, Observable } from "rxjs";
import { LexiconUnit } from "../domain/LexiconUnit";
import { SendAllLexiconUnitsUseCase} from '../use_case/api/SendAllLexiconUnitsUseCase';


export class SendAllLexiconUnitsController {
  private readonly uc: SendAllLexiconUnitsUseCase;

  constructor(uc: SendAllLexiconUnitsUseCase) {
    this.uc = uc;
  }
  send(lexiconUnitsArray:LexiconUnit[]): Observable<void> {
    return this.uc.send(lexiconUnitsArray);
  }
}