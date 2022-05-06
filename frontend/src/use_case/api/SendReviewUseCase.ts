import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";

export interface SendReviewUseCase {
    sendReview(lexiconUnitsArray:ViewReview): Observable<void>;
}