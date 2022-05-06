import { Observable } from "rxjs";
import { BoundaryReview } from "../model/BoundaryReview";

export interface RetrieveAllReviewsUseCase {
    retrieve(): Observable<BoundaryReview[]>;
}