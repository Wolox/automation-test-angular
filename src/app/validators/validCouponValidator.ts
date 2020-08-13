import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validCouponValidator(coupons): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value || coupons.includes(control.value)) {
          return null
      }
      return { 'invalidCoupon': true };
  };
}
