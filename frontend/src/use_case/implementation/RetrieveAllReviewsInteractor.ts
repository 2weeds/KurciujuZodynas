import { map, Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";
import { Review } from "../../domain/Review";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import { RetrieveAllPhrasesUseCase } from "../api/RetrieveAllPhrasesUseCase";
import { RetrieveAllReviewsUseCase } from "../api/RetrieveAllReviewsUseCase";
import { BoundaryPhrase } from "../model/BoundaryPhrase";
import { BoundaryReview } from "../model/BoundaryReview";

export class RetrieveAllReviewsInteractor implements RetrieveAllReviewsUseCase {
    private readonly reviewGW: ReviewGateway;

    constructor(reviewGW: ReviewGateway){
        this.reviewGW = reviewGW;
    }

    retrieve(): Observable<BoundaryReview[]> {
        return this.reviewGW
            .retrieveAllReviews()
            .pipe(map((reviewArray) => this.convertD2B(reviewArray)));
    }

    private convertD2B(reviewArray: Review[]): BoundaryReview[] {
        const boundaryReviewArray: BoundaryReview[] = [];
        reviewArray.forEach(review => boundaryReviewArray.push(review));

        return boundaryReviewArray;
    }
}