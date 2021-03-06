import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";
import { GET_LEXICON_UNITS_TO_EXPORT_PATH, LEXICON_UNITS_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { LexiconGateway } from "../api/LexiconGateway";

export class RestLexiconGateway implements LexiconGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
  sendLexiconUnitsToExport(lexiconUnitsArray: LexiconUnit[]): Observable<void> {
    return this.client.post<void>(GET_LEXICON_UNITS_TO_EXPORT_PATH, lexiconUnitsArray);
  }

  createNewLexiconUnit(word: string, abbreviation: string, file: File, token: string | undefined): Observable<void> {
      const body = new FormData();
      body.append('word', word);
      body.append('abbreviation', abbreviation);
      body.append('file', file);

      const headers = {
        Authorization: 'Bearer ' + token,
      };

    return this.client.post<void>(LEXICON_UNITS_PATH, body, headers);
  }

  retrieveAllLexiconUnits(): Observable<LexiconUnit[]> {
    return this.client.get<LexiconUnit[]>(LEXICON_UNITS_PATH);
  }
}