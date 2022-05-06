import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import { CreateNewReviewUseCase } from "../api/CreateNewReviewUseCase";

export class CreateNewReviewInteractor implements CreateNewReviewUseCase {
    private readonly gateway: ReviewGateway;

    constructor(gateway: ReviewGateway) {
        this.gateway = gateway;
    }

    create(name: string,reviewText:string, rating: number): void {
        this.gateway.addReview(name, reviewText, rating);
    }
}