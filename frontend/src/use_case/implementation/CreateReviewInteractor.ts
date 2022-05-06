import { Observable } from "rxjs";
import { ViewReview } from "../../controller/model/ViewReview";
import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import {CreateReviewUseCase} from "../api/CreateReviewUseCase"

export class CreateReviewInteractor implements CreateReviewUseCase {
    private readonly reviewGW: ReviewGateway;

    constructor(reviewGW: ReviewGateway){
        this.reviewGW = reviewGW;
    }

    sendReview(review:ViewReview): Observable<void> {
        return this.reviewGW
            .sendReview(review);
    }
}