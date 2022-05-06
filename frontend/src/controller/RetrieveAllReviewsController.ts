import { map, Observable } from "rxjs";
import { RetrieveAllPhrasesUseCase } from "../use_case/api/RetrieveAllPhrasesUseCase";
import { RetrieveAllReviewsUseCase } from "../use_case/api/RetrieveAllReviewsUseCase";
import { BoundaryPhrase } from "../use_case/model/BoundaryPhrase";
import { BoundaryReview } from "../use_case/model/BoundaryReview";
import { ViewPhrase } from "./model/ViewPhrase";
import { ViewReview } from "./model/ViewReview";

export class RetrieveAllReviewsController {
  private readonly uc: RetrieveAllReviewsUseCase;

  constructor(uc: RetrieveAllReviewsUseCase) {
    this.uc = uc;
  }

  retrieve(): Observable<ViewReview[]> {
    return this.uc.retrieve().pipe(map((reviewsArray) => this.convertB2V(reviewsArray)));
  }

  convertB2V(reviewsArray: BoundaryReview[]): ViewReview[] {
    const viewReviewsArray: ViewReview[] = [];
        reviewsArray.forEach(review => viewReviewsArray.push(review));
        return viewReviewsArray;
  }
}