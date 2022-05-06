export class BoundaryReview {
    readonly name: string;
    readonly comment: string;
    readonly rating: number;

    constructor(name: string, comment: string, rating: number) {
        this.name = name;
        this.comment = comment;
        this.rating = rating;
    }
}