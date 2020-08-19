import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ModalService } from 'src/app/services/modal.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

export const MENU_ITEMS = [
  {
    url: '/home',
    title: 'Inicio'
  },
  {
    url: '/coupons',
    title: 'Cupones'
  },
  {
    url: '/orders',
    title: 'Mis pedidos'
  },
  {
    url: '/profile',
    title: 'Información personal'
  }
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  userLogged: string;
  menuItems = MENU_ITEMS;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalService: ModalService,
    private couponsService: CouponsService,
    private ordersService: OrdersService
  ) {
    this.userLogged = this.authService.getUser();
  }

  onLogout() {
    this.ordersService.clearOrders();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  openCouponModal() {
    this.modalService.open();
  }

  showFreeCouponButton(): boolean {
    return !this.couponsService.userHasCoupons(this.userLogged);
  }
}
