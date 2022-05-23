export class Review{
    private readonly name:string;
    private readonly reviewText: string;
    private readonly rating: number;

    constructor(name:string, reviewText:string, rating:number){
        this.name = name;
        this.reviewText = reviewText;
        this.rating = rating;
    }
    getName(){
        return this.name;
    }
    getReviewText(){
        return this.reviewText;
    }
    getRating(){
        return this.rating;
    }
}