import { map, Observable } from "rxjs";
import { Phrase } from "../domain/Phrase";
import { SendPhrasesToExportUseCase} from '../use_case/api/SendPhrasesToExportUseCase';


export class SendPhrasesToExportController {
  private readonly uc: SendPhrasesToExportUseCase;

  constructor(uc: SendPhrasesToExportUseCase) {
    this.uc = uc;
  }
  send(phrasesArray:Phrase[]): Observable<void> {
    return this.uc.send(phrasesArray);
  }
}