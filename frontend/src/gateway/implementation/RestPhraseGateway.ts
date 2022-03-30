import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";
import { PHRASES_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { PhraseGateway } from "../api/PhraseGateway";

export class RestPhraseGateway implements PhraseGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

    createNewPhrase(phrase: string, token: string | undefined): Observable<void> {
        const body = {
            phrase: phrase,
            token: token
        };

    return this.client.post<void>(PHRASES_PATH, body);
    }

    retrieveAllPhrases(): Observable<Phrase[]> {
      return this.client.get<Phrase[]>(PHRASES_PATH);
    }
}