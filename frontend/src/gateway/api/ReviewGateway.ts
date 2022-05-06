import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";

export interface ReviewGateway {
  sendReview(review: ViewReview): Observable<void>;
}