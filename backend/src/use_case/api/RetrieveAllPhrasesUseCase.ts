import { BoundaryPhrase } from "./entity/BoundaryPhrase";

export interface RetrieveAllPhrasesUseCase {
    retrieve(): BoundaryPhrase[];
}