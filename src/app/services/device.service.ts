import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Send } from '../models/request/send';

const SERVER_URL = environment.serviceURL; 

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  public sendMessage(id, send: Send) {
    const url = `${SERVER_URL}/api/devices/${id}/send`
    return this.httpClient.post(url, send);
  }
}
