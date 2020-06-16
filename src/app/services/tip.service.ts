import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tip } from '../models/tip';

const SERVER_URL = environment.serviceURL; 

@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private httpClient: HttpClient) { }

  public getAllTips(): Observable<Array<Tip>> {
    const url = `${SERVER_URL}/api/tips/`;
    return this.httpClient.get<Array<Tip>>(url);
  }

  public getAllTipById(id: number): Observable<Tip> {
    const url = `${SERVER_URL}/api/tips/${id}`;
    return this.httpClient.get<Tip>(url);
  }

  public createTip(tip: Tip): Observable<Tip> {
    const url = `${SERVER_URL}/api/tips/`;
    return this.httpClient.post<Tip>(url, tip);
  }

  public updateTipById(id: number, tip: Tip): Observable<Tip> {
    const url = `${SERVER_URL}/api/tips/${id}`;
    return this.httpClient.put<Tip>(url, tip);
  }
}
