export class Review {
    readonly name: string;
    readonly reviewText: string;
    readonly rating: number;

    constructor(name: string, reviewText: string, rating: number) {
        this.name = name;
        this.reviewText = reviewText;
        this.rating = rating;
    }
}