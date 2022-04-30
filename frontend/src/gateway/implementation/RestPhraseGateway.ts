import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";
import { GET_PHRASES_TO_EXPORT_PATH, PHRASES_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { PhraseGateway } from "../api/PhraseGateway";

export class RestPhraseGateway implements PhraseGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
  sendPhrasesToExport(phrasesToExport: Phrase[]): Observable<void> {
    return this.client.post<void>(GET_PHRASES_TO_EXPORT_PATH, phrasesToExport);
  }

    createNewPhrase(phrase: string, file: File, token: string | undefined): Observable<void> {
        const body = new FormData();
        body.append('phrase', phrase);
        body.append('file', file);
        
        const headers = {
          Authorization: 'Bearer ' + token,
        };

    return this.client.post<void>(PHRASES_PATH, body, headers);
    }

    retrieveAllPhrases(): Observable<Phrase[]> {
      return this.client.get<Phrase[]>(PHRASES_PATH);
    }
}