import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import { ViewReview } from "../../../controller/model/ViewReview";
import { CreateReviewController } from "../../../controller/CreateReviewController";
import { RetrieveAllReviewsController } from "../../../controller/RetrieveAllReviewsController";
import { useRetrievalObserver } from "../observer/useRetrievalObserver";

export function useSendReviewWindow(
    CreateReviewController: CreateReviewController,
  ): (review: ViewReview) => void {
    const send = (review: ViewReview) => {
        CreateReviewController.sendReview(review).subscribe();
    };
    return send;
  }


export function useRetrieveReviewWindow(
  retrieveAllReviewsController: RetrieveAllReviewsController,
  setResponse: (reviews: ViewReview[]) => void
): () => void {
  const observer = useRetrievalObserver(setResponse);
  const retrieve = () => {
    retrieveAllReviewsController.retrieve().subscribe(observer);
  };
  return retrieve;
}