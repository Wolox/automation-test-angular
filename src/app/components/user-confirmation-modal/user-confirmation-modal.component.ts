import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-confirmation-modal',
  templateUrl: './user-confirmation-modal.component.html',
  styleUrls: ['./user-confirmation-modal.component.scss']
})
export class UserConfirmationModalComponent {
  public opened = false;

  constructor() { }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}
