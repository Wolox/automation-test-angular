import { Component } from '@angular/core';
import { Offer } from 'src/app/mocks/offers.mock';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { validCouponValidator } from 'src/app/validators/validCouponValidator';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent {
  opened = false;
  offer: Offer;
  couponControl: FormControl;
  private confirmOrder = new BehaviorSubject<boolean>(false);
  confirmOrderEvent = this.confirmOrder.asObservable();

  constructor(
    private ordersService: OrdersService,
    private couponsService: CouponsService,
    private authService: AuthenticationService
  ) {
    const currentUser = this.authService.getUser();
    const coupons = this.couponsService.getUserCoupons(currentUser).map(c => c.code);
    this.couponControl = new FormControl("", validCouponValidator(coupons));
    this.resetOffer();
  }

  open(offer: Offer) {
    this.offer = offer;
    this.opened = true;
  }

  close() {
    this.resetOffer();
    this.opened = false;
  }

  confirmOder() {
    if (!this.couponControl.errors){
      const newOrder = {
        ...this.offer,
        usedCoupon: this.couponControl.value!!
      };
      if (newOrder.usedCoupon){
        this.couponsService.useCoupon(this.couponControl.value);
      }
      this.ordersService.addNewOrder(newOrder);
      this.opened = false;
      this.confirmOrder.next(true);
    }
  }

  resetOffer() {
    this.offer = {
      id: '',
      date: '',
      price: 0,
      description: '',
      shipping_cost: 0,
      local: '',
      address: ''
    };
    this.couponControl.reset();
  }
}
