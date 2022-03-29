import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import { RetrieveAllLexiconUnitsController } from "../../../controller/RetrieveAllLexiconUnitsController";
import { useRetrievalObserver } from "../observer/useRetrievalObserver";

export default function useLexiconWindow(
    retrieveAllLexiconUnitsController: RetrieveAllLexiconUnitsController,
    setResponse: (lexiconUnits: ViewLexiconUnit[]) => void
  ): () => void {
    const observer = useRetrievalObserver(setResponse);
    const retrieve = () => {
        retrieveAllLexiconUnitsController.retrieve().subscribe(observer);
    };
  
    return retrieve;
  }