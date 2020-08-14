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
      date: '2022-12-31',
      description: 'Cupón de Bienvenida',
      uses: 2
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

  useCoupon(couponCode: string) {
    const freeCouponList = this.getFreeCouponsList() || [];
    const freeCouponKey = this.localStorage.FREE_COUPON;
    const newCouponsList = [];
    freeCouponList.forEach(element => {
      if (element.code === couponCode) {
        if (element.uses !== 1) {
          const newElement = {
            ...element,
            uses: element.uses - 1
          };
          newCouponsList.push(newElement);
        }
      } else {
        newCouponsList.push(element);
      }
    });
    this.localStorage.setValue(freeCouponKey, newCouponsList);
  }

  private deleteCoupon() {
    this.localStorage.removeValue(this.localStorage.FREE_COUPON);
  }
}
