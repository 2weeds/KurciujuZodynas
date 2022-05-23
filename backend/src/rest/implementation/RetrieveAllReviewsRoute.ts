import { Request, Response } from "express";
import { BoundaryReview } from "../../use_case/api/entity/BoundaryReview";
import { RetrieveAllReviewsUseCase } from "../../use_case/api/RetrieveAllReviewsUseCase";
import { RestReview } from "../api/entity/RestReview";

export class RetrieveAllReviewsRoute {
    private readonly useCase: RetrieveAllReviewsUseCase;

    constructor(useCase: RetrieveAllReviewsUseCase) {
        this.useCase = useCase;
    }

    retrieve(req: Request, res: Response): void {
        try {
            const interactorResponse = this.useCase.retrieve();
            const restResponse = interactorResponse.map(element => this.convertB2R(element));
            res.status(200).json(restResponse);
        } catch (e) {
            const err = e as Error;
            res.status(500).json(err.message);
        }
    }

    private convertB2R(review: BoundaryReview): RestReview {
        return new RestReview(review.getName(),review.getReviewText(), review.getRating());
    }
}