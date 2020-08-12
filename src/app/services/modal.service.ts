import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  modalStatusChange = this.isOpened.asObservable();

  constructor() { }

  close() {
    this.isOpened.next(false);
  }

  open() {
    this.isOpened.next(true);
  }
}
