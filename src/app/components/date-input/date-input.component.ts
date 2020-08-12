import { Component, OnInit, Injector, forwardRef, Input, Host, Optional, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { Observable, EMPTY, merge } from 'rxjs';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() id: string;
  value: string;
  formControl: NgControl;
  onChange: () => void;
  onTouch: () => void;
  submit$: Observable<Event>;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showInputField: false
  };

  constructor(
    private inj: Injector,
    @Optional() @Host() private form: FormSubmitDirective,
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    this.formControl = this.inj.get(NgControl);
  }

  writeValue(value: any) {
    this.value = value || value === 0 ? value : '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onDatePickerChange(dateInfo) {
    this.formControl.control.setValue(dateInfo.formatted);
  }
}
