import { ViewLesson } from "../../../controller/model/ViewLesson";
import { RetrieveAllLessonsController } from "../../../controller/RetrieveAllLessonsController";
import { useRetrievalObserver } from "../observer/useRetrievalObserver";

export default function useLexiconWindow(
    retrieveAllLessonsController: RetrieveAllLessonsController,
    setResponse: (lessons: ViewLesson[]) => void
  ): () => void {
    const observer = useRetrievalObserver(setResponse);
    const retrieve = () => {
        retrieveAllLessonsController.retrieve().subscribe(observer);
    };
  
    return retrieve;
  }