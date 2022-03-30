import { map, Observable } from "rxjs";
import { RetrieveAllPhrasesUseCase } from "../use_case/api/RetrieveAllPhrasesUseCase";
import { BoundaryPhrase } from "../use_case/model/BoundaryPhrase";
import { ViewPhrase } from "./model/ViewPhrase";

export class RetrieveAllPhrasesController {
  private readonly uc: RetrieveAllPhrasesUseCase;

  constructor(uc: RetrieveAllPhrasesUseCase) {
    this.uc = uc;
  }

  retrieve(): Observable<ViewPhrase[]> {
    return this.uc.retrieve().pipe(map((phrasesArray) => this.convertB2V(phrasesArray)));
  }

  convertB2V(phrasesArray: BoundaryPhrase[]): ViewPhrase[] {
    const viewPhraseArray: ViewPhrase[] = [];
        phrasesArray.forEach(phrase => viewPhraseArray.push(phrase));

        return viewPhraseArray;
  }
}