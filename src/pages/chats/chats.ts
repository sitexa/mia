import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { App, IonicPage } from "ionic-angular";
import { Chats, Messages } from "api/collections";
import { Chat } from "api/models";

@IonicPage()
@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {
  chats;

  constructor(private appCtrl: App) {
  }

  ngOnInit() {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          chats.map((chat: Chat) =>
            Messages
              .find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }

  showMessages(chat): void {
    this.appCtrl.getRootNav().push('MessagesPage', {chat: chat});
  }

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }
}


