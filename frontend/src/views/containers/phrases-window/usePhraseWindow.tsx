import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import { RetrieveAllPhrasesController } from "../../../controller/RetrieveAllPhrasesController";
import { useRetrievalObserver } from "../observer/useRetrievalObserver";

export default function usePhraseWindow(
    retrieveAllPhrasesController: RetrieveAllPhrasesController,
    setResponse: (phrases: ViewPhrase[]) => void
  ): () => void {
    const observer = useRetrievalObserver(setResponse);
    const retrieve = () => {
      retrieveAllPhrasesController.retrieve().subscribe(observer);
    };
  
    return retrieve;
  }