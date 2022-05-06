import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";
import { Review } from "../../domain/Review";
import { GET_REVIEW_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { ReviewGateway } from "../api/ReviewGateway";

export class RestReviewGateway implements ReviewGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  
  sendReview(review: ViewReview): Observable<void> {
      return this.client.post<void>(GET_REVIEW_PATH, review);
  }
  retrieveAllReviews(): Observable<Review[]> {
    return this.client.get<Review[]>(GET_REVIEW_PATH);
  }
}