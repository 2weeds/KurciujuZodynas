import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";

export interface CreateReviewUseCase {
    sendReview(lexiconUnitsArray:ViewReview): Observable<void>;
}