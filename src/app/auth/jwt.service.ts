import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token) {
    localStorage.setItem('token', token)
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token
  }

  isLoggedIn() {
    return !!this.getToken()
  }

  resetToken() {
    localStorage.clear()
  }
}
