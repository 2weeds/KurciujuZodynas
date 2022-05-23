export interface CreateNewReviewUseCase {
    create(name: string, reviewText: string, rating: number): void;
}