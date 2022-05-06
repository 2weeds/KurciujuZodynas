export class ViewReview {
    readonly name: string;
    readonly reviewText: string;
    readonly rating: number|null;

    constructor(name: string, reviewText: string, rating: number|null) {
        this.name = name;
        this.reviewText = reviewText;
        this.rating = rating;
    }
}