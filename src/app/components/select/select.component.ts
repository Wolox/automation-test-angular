import {
  Component,
  OnInit,
  Input,
  Injector,
  AfterViewInit,
  forwardRef,
  Optional,
  Host,
  OnDestroy,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, merge, Observable, EMPTY } from 'rxjs';
import { generateRandomString } from 'src/app/utils/string-random-generator';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() id: string;
  @Input() options: { id: any, name: string }[] = [];
  value: string;
  formControl: NgControl;
  onChange: (fn) => void;
  onTouch: () => void;
  showError = false;
  isRequired = false;
  idError: string;
  private unsubscribe$: Subject<any> = new Subject();
  private focusOut$: Subject<any> = new Subject();
  submit$: Observable<Event>;
  @HostListener('focusout', ['$event'])
  onFocusout(event) {
    this.focusOut$.next(event);
  }

  constructor(
    private inj: Injector,
    @Optional() @Host() private form: FormSubmitDirective,
    private cdr: ChangeDetectorRef
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    this.formControl = this.inj.get(NgControl);
    this.resolveIDs();
  }

  ngAfterViewInit() {
    this.id = this.id || generateRandomString(5);
    merge(
      this.submit$,
      this.focusOut$
    ).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      const controlErrors = this.formControl.control.errors;
      this.showError = false;
      if (controlErrors) {
        this.showError = true;
      }
    });
    if (this.formControl.control.validator) {
      const validators = this.formControl.control.validator(this.formControl.control);
      if (validators) {
        this.isRequired = !!validators.required;
      }
    }
    this.cdr.detectChanges();
  }

  resolveIDs() {
    this.idError = `e-${this.id}`;
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

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
