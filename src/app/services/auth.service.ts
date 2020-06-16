import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/request/login';
import { User } from '../models/user'

const SERVER_URL = environment.serviceURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(login: Login): Observable<User> {
    const url = `${SERVER_URL}/api/users/login`;

    return this.httpClient.post<User>(url, login);
  }

  public registerUser(user: User): Observable<User> {
    const url = `${SERVER_URL}/api/users`;

    return this.httpClient.post<User>(url, user);
  }

  public getUserById(id: number): Observable<User> {
    const url = `${SERVER_URL}/api/users/${id}`;

    return this.httpClient.get<User>(url);
  }

  public updateUserById(id: Number, user: User): Observable<User> {
    const url = `${SERVER_URL}/api/users/${id}`;

    return this.httpClient.put<User>(url, user);
  }
}
