import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { App, PopoverController, IonicPage, NavController } from "ionic-angular";
import { Chats, Messages } from "api/collections";
import { Chat } from "api/models";

@IonicPage()
@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {
  chats;

  constructor(private appCtrl: App,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController) {
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

  //todo 为什么在options中打开editProfile之后，showMessages就打不开了呢？
  //todo 为什么editProfile窗体能覆盖tab位，而MessagesPage窗体在用navCtrl.push()的时候不能覆盖tab位？
  showMessages(chat): void {
    //this.appCtrl.getRootNavs()[0].push('MessagesPage', {chat: chat});
    this.navCtrl.push('MessagesPage', {chat: chat});
  }

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create('ChatsOptionsComponent', {}, {
      cssClass: 'options-popover chats-options-popover'
    });

    popover.present();
  }
}


