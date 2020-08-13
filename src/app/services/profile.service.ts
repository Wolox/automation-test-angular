import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userData = {
    name: 'Jorge',
    lastname: 'perez',
    birthday: '12/04/1992',
    country: 1,
    gender: 'M'
  }

  constructor() { }

  getUserData() {
    return this.userData;
  }

  updateUserData(value) {
    this.userData = value;
  }
}
