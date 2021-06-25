import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;

  constructor(private authService: AuthService) {
    this.socket = new WebSocket(environment.wsBase);
    this.onConnect();
    this.onClose();
    this.onError();
  }

  onConnect() {
    this.socket.onopen = () => {
      const msg = {
        event: 'connection',
        user_id: this.user.id,
        email: this.user.email,
      };
      this.socket.send(JSON.stringify(msg))
    };
  }

  onClose() {
    this.socket.onclose = () => {};
  }

  onError() {
    this.socket.onerror = () => {};
  }

  get user() {
    return this.authService.user;
  }
}
