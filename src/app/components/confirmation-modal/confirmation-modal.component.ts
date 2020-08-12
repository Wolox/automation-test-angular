import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  public opened = false;

  constructor() { }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}
