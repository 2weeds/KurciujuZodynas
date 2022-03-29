import { map, Observable } from "rxjs";
import { RetrieveAllLexiconUnitsUseCase } from "../use_case/api/RetrieveAllLexiconUnitsUseCase";
import { BoundaryLexiconUnit } from "../use_case/model/BoundaryLexiconUnit";
import { ViewLexiconUnit } from "./model/ViewLexiconUnit";

export class RetrieveAllLexiconUnitsController {
  private readonly uc: RetrieveAllLexiconUnitsUseCase;

  constructor(uc: RetrieveAllLexiconUnitsUseCase) {
    this.uc = uc;
  }

  retrieve(): Observable<ViewLexiconUnit[]> {
    return this.uc.retrieve().pipe(map((unitArray) => this.convertB2V(unitArray)));
  }

  convertB2V(unitArray: BoundaryLexiconUnit[]): ViewLexiconUnit[] {
    const viewUnitArray: ViewLexiconUnit[] = [];
        unitArray.forEach(unit => viewUnitArray.push(unit));

        return viewUnitArray;
  }
}