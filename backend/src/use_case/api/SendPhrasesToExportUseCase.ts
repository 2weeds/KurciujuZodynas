import { Phrase } from "../../domain/Phrase";

export interface SendPhrasesToExportUseCase {
    send(phrasesArray:Phrase[]): void;
}