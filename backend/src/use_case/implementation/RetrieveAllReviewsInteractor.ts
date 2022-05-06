import { Review } from "../../domain/Review";
import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import { BoundaryReview } from "../api/entity/BoundaryReview";
import { RetrieveAllReviewsUseCase } from "../api/RetrieveAllReviewsUseCase";

export class RetrieveAllReviewsInteractor implements RetrieveAllReviewsUseCase {
    private readonly reviewGW: ReviewGateway;

    constructor(reviewGW: ReviewGateway) {
        this.reviewGW = reviewGW;
    }
    
    retrieve(): BoundaryReview[] {
        return this.reviewGW.retrieveAll().map(element => this.convertD2BPhrase(element));
    }

    private convertD2BPhrase(review: Review): BoundaryReview {
        return new BoundaryReview(review.getName(), review.getReviewText(), review.getRating())
    }
}