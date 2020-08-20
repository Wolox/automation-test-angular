import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData, USER_DATA } from '../mocks/profile.mock'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userData: UserData;

  constructor() { 
    this.userData = USER_DATA;
  }

  getUserData() {
    return this.userData;
  }

  updateUserData(value) {
    this.userData = value;
  }

  resetUserData(){
    this.userData = USER_DATA;
  }
}
