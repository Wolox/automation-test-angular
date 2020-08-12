import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  coupons = [];

  constructor(
    private authService: AuthenticationService,
    private couponsService: CouponsService
  ) { }

  ngOnInit() {
    const userLogged = this.authService.getUser();
    this.coupons = this.couponsService.getUserCoupons(userLogged);
  }
}
