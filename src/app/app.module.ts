import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { InputComponent } from './components/input/input.component';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { CouponsComponent } from './screens/coupons/coupons.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './screens/home/home.component';
import { CouponModalComponent } from './components/coupon-modal/coupon-modal.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { SelectComponent } from './components/select/select.component';
import { RadioInputComponent } from './components/radio-input/radio-input.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { OfferModalComponent } from './components/offer-modal/offer-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent,
    FormSubmitDirective,
    CouponsComponent,
    NavBarComponent,
    HomeComponent,
    CouponModalComponent,
    ProfileComponent,
    DateInputComponent,
    SelectComponent,
    RadioInputComponent,
    FileUploadComponent,
    OfferModalComponent,
    SpinnerComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
