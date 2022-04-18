import { BoundaryLesson } from "./entity/BoundaryLesson";

export interface RetrieveAllLessonsUseCase {
    retrieve(): BoundaryLesson[];
}