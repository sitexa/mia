import { Injectable } from '@angular/core';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

@Injectable()
export class PhoneService {
  verify(phoneNumber: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Accounts.requestPhoneVerification(phoneNumber, (e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }

  login(phoneNumber: string, code: string,password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Accounts.verifyPhone(phoneNumber, code, password,(e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }

  createUser(options: Object): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Accounts.createUserWithPhone(options, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  loginUser(phone: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPhoneAndPassword({phone: phone}, password, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }
}
