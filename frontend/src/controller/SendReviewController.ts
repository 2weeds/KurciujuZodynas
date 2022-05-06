import { map, Observable } from "rxjs";
import { SendPhrasesToExportUseCase} from '../use_case/api/SendPhrasesToExportUseCase';
import { SendReviewUseCase } from "../use_case/api/SendReviewUseCase";
import { ViewReview } from "./model/ViewReview";


export class SendReviewController {
  private readonly uc: SendReviewUseCase;

  constructor(uc: SendReviewUseCase) {
    this.uc = uc;
  }
  sendReview(review:ViewReview): Observable<void> {
    return this.uc.sendReview(review);
  }
}