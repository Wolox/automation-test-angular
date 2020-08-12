import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private localStorageService: LocalStorageService) { }

  getToken() {
    return this.localStorageService.getValue(this.localStorageService.SESSION_TOKEN);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  getUser() {
    return this.getToken().username;
  }

  logout() {
    this.localStorageService.removeValue(this.localStorageService.SESSION_TOKEN);
  }
}
