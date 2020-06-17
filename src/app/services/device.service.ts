import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Send } from '../models/request/send';
import { Observable } from 'rxjs';
import { Device } from '../models/device';

const SERVER_URL = environment.serviceURL; 

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  public sendMessage(id, send: Send) {
    const url = `${SERVER_URL}/api/devices/${id}/send`;
    return this.httpClient.post(url, send);
  }

  public getAllDevices(): Observable<Array<Device>> {
    const url = `${SERVER_URL}/api/devices/`; 
    return this.httpClient.get<Array<Device>>(url);
  }

  public getDeviceById(id: number): Observable<Device> {
    const url = `${SERVER_URL}/api/devices/${id}`; 
    return this.httpClient.get<Device>(url);
  }

  public createDevie(device: Device): Observable<Device> {
    const url = `${SERVER_URL}/api/devices/`; 
    return this.httpClient.post<Device>(url, device);
  }

  public updateDeviceById(id: number, device: Device): Observable<Device> {
    const url = `${SERVER_URL}/api/devices/${id}`; 
    return this.httpClient.put<Device>(url, device);
  }
}
