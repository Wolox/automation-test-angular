import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Injector,
  AfterViewInit,
  OnDestroy,
  Optional,
  Host,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject, Observable, EMPTY, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { generateRandomString } from 'src/app/utils/string-random-generator';

export const TYPES = {
  TEXT: 'text',
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() type = TYPES.TEXT;
  @Input() errorMessage: string;
  @Input() id: string;
  @Input() showErrorsListener$: Observable<Event> = EMPTY;
  onChange: (fn) => void;
  onTouch: () => void;
  value: string;
  formControl: NgControl;
  showError = false;
  isRequired = false;
  idError: string;
  private unsubscribe$: Subject<any> = new Subject();
  private focusOut$: Subject<any> = new Subject();
  submit$: Observable<Event>;
  TYPES = TYPES;
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

  ngOnInit(): void {
    this.formControl = this.inj.get(NgControl);
  }

  ngAfterViewInit() {
    merge(
      this.submit$,
      this.focusOut$,
      this.showErrorsListener$
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
      this.isRequired = !!validators.required;
    }
    this.cdr.detectChanges();
    this.resolveIDs();
  }

  resolveIDs() {
    this.id = this.id || generateRandomString(5);
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
