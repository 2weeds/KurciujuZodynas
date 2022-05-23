import { Review } from "../../domain/Review";
import { ReviewGateway } from "../api/ReviewGateway";
import * as fs from 'fs';

export class InMemoryReviewGateway implements ReviewGateway {
    private readonly filename: string;
    private readonly fs = require('fs');

    constructor(filename: string) {
        this.filename = filename;
    }

    addReview(name: string, reviewText: string, rating: number): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const newReview = new Review(name, reviewText, rating);
        try {
            jsonObj.reviews.push(newReview);
            const json = JSON.stringify(jsonObj);
            fs.writeFileSync(this.filename + '.json', json);
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
    retrieveAll(): Review[] {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();

        return this.transformToReviewArray(jsonObj.reviews);
    }
    private transformToReviewArray(reviews: any): Review[] {
        const allReviews: Review[] = [];
        reviews.forEach((element: any) => {
            const review = new Review(element.name, element.reviewText, element.rating);
            allReviews.push(review);
        });
        return allReviews;
    }
    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { reviews: Review[] } = {
            reviews: []
        };
        try {
            const readLines = fs.readFileSync(this.filename + '.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            fs.writeFileSync(this.filename + '.json', json);
        }

        return obj;
    }
}