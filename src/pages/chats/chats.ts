import { Component } from '@angular/core';
import { Observable } from "rxjs";
import * as moment from 'moment';
import { MessageType, Chat } from "../../models";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage {
  chats: Observable<Chat[]>;

  constructor() {
    this.chats = this.findChats();
  }

  private findChats(): Observable<Chat[]> {
    return Observable.of([
      {
        _id: '0',
        title: 'Adam Smith',
        picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
        lastMessage: {
          content: 'You on your way?',
          createdAt: moment().subtract(1, 'hour').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '1',
        title: 'Bryan Wallace',
        picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
        lastMessage: {
          content: 'Hi! It\' me!',
          createdAt: moment().subtract(1, 'day').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '2',
        title: 'Stevenson Stewart',
        picture: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
        lastMessage: {
          content: 'I am MVP',
          createdAt: moment().subtract(4, 'day').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '3',
        title: 'Ben Wallace',
        picture: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
        lastMessage: {
          content: 'Rock and Roll!',
          createdAt: moment().subtract(2, 'week').toDate(),
          type: MessageType.TEXT
        }
      },
    ])
  }

  removeChat(chat: Chat): void {
    this.chats = this.chats.map((chatsArray: Chat[]) => {
      const chatIndex = chatsArray.indexOf(chat);
      if (chatIndex !== -1) {
        chatsArray.splice(chatIndex, 1);
      }

      return chatsArray;
    });
  }
}


