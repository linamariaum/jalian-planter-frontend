import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Pot } from '../models/pot';
const SERVER_URL = environment.serviceURL;

@Injectable({
  providedIn: 'root'
})

export class PotServiceService {

  constructor(private httpClient: HttpClient) { }

  public getPodByid(id): Observable<Pot>
  {
    const url = `${SERVER_URL}/api/pots/${id}`;
    return this.httpClient.get<Pot>(url);
  }

  public getMessagesOfAPot(id) {
    const url = `${SERVER_URL}/api/pots/${id}/messages`;
    return this.httpClient.get(url);
  }
}
