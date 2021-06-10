import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  messageControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    console.log(this.messageControl.value, ' message')
    this.messageControl.reset();
  }

}
