import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AuthService, IUser } from '../auth/auth.service';
import { ChatService } from './chat.service';

export interface IMessage {
  color: string;
  created_at: string;
  email: string;
  event: string;
  id: number;
  message: string;
  user_id: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  messages: IMessage[] = [] as IMessage[];
  messageControl = new FormControl();

  constructor(private authService: AuthService,
              private chatService: ChatService) {
    this.authService.getCurrentUser().subscribe((user: IUser) => {
      this.authService.setUser(user);

      this.chatService.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.event === 'get-all-messages') {
          this.messages = msg.messages;
        } else {
          this.messages = [msg, ...this.messages];
        }
      };
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    const msg = {
      event: 'message',
      user_id: this.user.id,
      email: this.user.email,
      message: this.messageControl.value,
    };
    this.chatService.socket.send(JSON.stringify(msg));
    this.messageControl.reset();
  }

  get user() {
    return this.authService.user;
  }

}
