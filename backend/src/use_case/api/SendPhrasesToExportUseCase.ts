import { Phrase } from "../../domain/Phrase";

export interface SendPhrasesToExportUseCase {
    send(phrasesArray:Phrase[]): void;
    create(scormProps:{authorsName:string,generalInformation:string}):void;
}