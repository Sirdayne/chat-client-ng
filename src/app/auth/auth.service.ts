import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IAuthResponse {
  id: number;
  color: string;
  email: string;
  role: string;
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  role: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser;

  constructor(private httpService: HttpClient) { }

  login(body) {
    return this.httpService.post<IAuthResponse>('/login', body)
  }

  register(body) {
    return this.httpService.post<IAuthResponse>('/register', body)
  }

  getCurrentUser() {
    return this.httpService.get<IUser>('/current-user');
  }

  setUser(user: IUser) {
    this.user = user;
  }
}
