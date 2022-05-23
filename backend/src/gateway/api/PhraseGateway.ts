import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
    createPhrase(phrase: string, file: any): void;
    sendToExport(phrasesArray:Phrase[]): void;
    retrieveAll(): Phrase[];
    createScormProps(scormProps:{authorsName:string, generalInformation:string}):void;
}