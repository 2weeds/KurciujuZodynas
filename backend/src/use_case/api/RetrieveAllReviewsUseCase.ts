import { BoundaryReview } from "./entity/BoundaryReview";

export interface RetrieveAllReviewsUseCase {
    retrieve(): BoundaryReview[];
}