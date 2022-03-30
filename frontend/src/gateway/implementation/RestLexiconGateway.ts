import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";
import { LEXICON_UNITS_PATH } from "../../RouteConstants";
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

    return this.client.post<void>(LEXICON_UNITS_PATH, body);
  }

  retrieveAllLexiconUnits(): Observable<LexiconUnit[]> {
    return this.client.get<LexiconUnit[]>(LEXICON_UNITS_PATH);
  }
}