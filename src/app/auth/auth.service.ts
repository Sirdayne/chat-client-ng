import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IAuthResponse {
  id: number;
  color: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }

  login(body) {
    return this.httpService.post<IAuthResponse>('/login', body)
  }

  register(body) {
    return this.httpService.post<IAuthResponse>('/register', body)
  }
}
