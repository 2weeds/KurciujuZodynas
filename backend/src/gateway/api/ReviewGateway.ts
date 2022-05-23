import { Review } from "../../domain/Review";

export interface ReviewGateway {
    addReview(name: string, review:string, rating: number): void;
    retrieveAll(): Review[];
}