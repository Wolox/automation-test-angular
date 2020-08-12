import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private localStorage: LocalStorageService) { }

  registerFreeCoupon(coupon: string, user: string): void {
    const freeCouponKey = this.localStorage.FREE_COUPON;
    const freeCouponList = this.getFreeCouponsList() || [];
    freeCouponList.push({
      username: user,
      code: coupon,
      date: '2019-12-31',
      description: 'Cupón de Bienvenida'
    });
    this.localStorage.setValue(freeCouponKey, freeCouponList);
  }

  private getFreeCouponsList() {
    return this.localStorage.getValue(this.localStorage.FREE_COUPON);
  }

  getUserCoupons(user: string): any[] {
    const freeCouponList = this.getFreeCouponsList() || [];
    const coupons = [];
    freeCouponList.forEach(element => {
      if (user === element.username) {
        coupons.push(element);
      }
    });
    return coupons;
  }

  userHasCoupons(username: string): boolean {
    return this.getUserCoupons(username).length !== 0;
  }
}
