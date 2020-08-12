import { Component } from '@angular/core';
import { Offer } from 'src/app/mocks/offers.mock';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {
    this.resetOffer();
    this.couponControl = new FormControl();
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
    this.opened = false;
    this.confirmOrder.next(true);
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
  }
}
