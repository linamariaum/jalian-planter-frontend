import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
const SERVER_URL = environment.serviceURL;

@Injectable({
  providedIn: 'root'
})

export class PotServiceService {

  constructor(private httpClient: HttpClient) { }

  public getPodByid(id) 
  {
    const url = `${SERVER_URL}/api/pots/${id}`;
    return this.httpClient.get(url);
  }

  public getMessagesOfAPot(id) {
    const url = `${SERVER_URL}/api/pots/${id}/messages`;
    return this.httpClient.get(url);
  }
}
