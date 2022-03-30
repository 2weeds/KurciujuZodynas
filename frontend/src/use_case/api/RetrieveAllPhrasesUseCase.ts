import { Observable } from "rxjs";
import { BoundaryPhrase } from "../model/BoundaryPhrase";

export interface RetrieveAllPhrasesUseCase {
    retrieve(): Observable<BoundaryPhrase[]>;
}