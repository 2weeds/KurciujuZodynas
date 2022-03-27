import { Observable } from "rxjs";
import { LEXICON_UNIT_CREATION_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { LexiconGateway } from "../api/LexiconGateway";

export class RestLexiconGateway implements LexiconGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
    createNewLexiconUnit(word: string, abbreviation: string, token: string | undefined): Observable<void> {
        const body = {
            word: word,
            abbreviation: abbreviation,
            token: token
        };

    return this.client.post<void>(LEXICON_UNIT_CREATION_PATH, body);
    }
}