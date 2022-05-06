export class ViewReview {
    readonly name: string;
    readonly comment: string;
    readonly rating: number|null;

    constructor(name: string, comment: string, rating: number|null) {
        this.name = name;
        this.comment = comment;
        this.rating = rating;
    }
}