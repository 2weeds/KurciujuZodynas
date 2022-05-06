import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import { ViewReview } from "../../../controller/model/ViewReview";
import { SendReviewController } from "../../../controller/SendReviewController";

export default function useReviewWindow(
    SendReviewController: SendReviewController,
  ): (review: ViewReview) => void {
    const send = (review: ViewReview) => {
        SendReviewController.sendReview(review).subscribe();
    };
    return send;
  }