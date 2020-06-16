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

  public getPodByid(id: number): Observable<Pot>
  {
    const url = `${SERVER_URL}/api/pots/${id}`;
    return this.httpClient.get<Pot>(url);
  }

  public getMessagesOfAPot(id: number) {
    const url = `${SERVER_URL}/api/pots/${id}/messages`;
    return this.httpClient.get(url);
  }

  public createPot(): Observable<Pot> {
    const url = `${SERVER_URL}/api/pots/`;
    
    return this.httpClient.post<Pot>(url, {});
  }

  public updatePotById(id: number, pot: Pot): Observable<Pot> {
    const url = `${SERVER_URL}/api/pots/${id}`;

    return this.httpClient.put<Pot>(url, pot);
  }
}
