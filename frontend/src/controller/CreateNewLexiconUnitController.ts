import { Observable } from "rxjs";
import { CreateNewLexiconUnitUseCase } from "../use_case/api/CreateNewLexiconUnitUseCase";

export class CreateNewLexiconUnitController {
  private readonly uc: CreateNewLexiconUnitUseCase;

  constructor(uc: CreateNewLexiconUnitUseCase) {
    this.uc = uc;
  }

  create(word: string, abbreviation: string): Observable<void> {
    return this.uc.create(word, abbreviation);
  }
}