import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";
import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import {SendReviewUseCase} from "./../api/SendReviewUseCase"

export class SendReviewInteractor implements SendReviewUseCase {
    private readonly reviewGW: ReviewGateway;

    constructor(reviewGW: ReviewGateway){
        this.reviewGW = reviewGW;
    }

    sendReview(review:ViewReview): Observable<void> {
        return this.reviewGW
            .sendReview(review);
    }
}