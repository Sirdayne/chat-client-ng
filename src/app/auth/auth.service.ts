import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }

  login(body) {
    return this.httpService.post('/login', body)
  }

  register(body) {
    return this.httpService.post('/register', body)
  }
}
