import { BoundaryLesson } from "./entity/BoundaryLesson";

export interface CreateNewLessonUseCase {
    create(lesson: BoundaryLesson): void;
}