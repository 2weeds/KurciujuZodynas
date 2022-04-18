import { CreateNewLessonController } from "../../../controller/CreateNewLessonController";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminLessonAdditionWindow(
  newLessonCreationController: CreateNewLessonController,
  ): (lesson: ViewLesson, token: string | undefined) => void {
    const observer = useAdminAdditionObserver();
    const add = (lesson: ViewLesson, token: string | undefined) => {
        newLessonCreationController.create(lesson, token).subscribe(observer);
    };
  
    return add;
  }