import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";
import { Review } from "../../domain/Review";

export interface ReviewGateway {
  sendReview(review: ViewReview): Observable<void>;
  retrieveAllReviews(): Observable<Review[]>;
}