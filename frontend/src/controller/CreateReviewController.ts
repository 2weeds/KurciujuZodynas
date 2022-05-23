import { map, Observable } from "rxjs";
import { SendPhrasesToExportUseCase} from '../use_case/api/SendPhrasesToExportUseCase';
import { CreateReviewUseCase } from "../use_case/api/CreateReviewUseCase";
import { ViewReview } from "./model/ViewReview";


export class CreateReviewController {
  private readonly uc: CreateReviewUseCase;

  constructor(uc: CreateReviewUseCase) {
    this.uc = uc;
  }
  sendReview(review:ViewReview): Observable<void> {
    return this.uc.sendReview(review);
  }
}