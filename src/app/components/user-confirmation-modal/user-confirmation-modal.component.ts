import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-confirmation-modal',
  templateUrl: './user-confirmation-modal.component.html',
  styleUrls: ['./user-confirmation-modal.component.scss']
})
export class UserConfirmationModalComponent {
  public opened = false;

  constructor( private router: Router ) { }

  open() {
    this.opened = true;
  }

  close() {
    this.router.navigateByUrl('/home')
    this.opened = false;
  }
}
