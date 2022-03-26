import { Observable } from "rxjs";
import { CreateNewPhraseUseCase } from "../use_case/api/CreateNewPhraseUseCase";

export class CreateNewPhraseController {
  private readonly uc: CreateNewPhraseUseCase;

  constructor(uc: CreateNewPhraseUseCase) {
    this.uc = uc;
  }

  create(phrase: string): Observable<void> {
    return this.uc.create(phrase);
  }
}