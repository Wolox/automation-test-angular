import { Component, OnInit, Input, HostListener, ElementRef, AfterViewInit, Optional, Host, OnDestroy, Injector, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { generateRandomString } from 'src/app/utils/string-random-generator';
import { Subject, Observable, EMPTY } from 'rxjs';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() id: string;
  onChange: Function;
  file: File | null = null;
  formControl: NgControl;
  idError: string;
  showError = false;
  private unsubscribe$: Subject<any> = new Subject();
  submit$: Observable<Event>;
  @ViewChild('previewImg', { static: false }) previewImg: ElementRef;
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList) {
    const file = files && files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.previewImg.nativeElement.src = e.target.result;
    };
    this.onChange(file);
    this.file = file;
  }

  constructor(
    private inj: Injector,
    private host: ElementRef<HTMLInputElement>,
    @Optional() @Host() private form: FormSubmitDirective
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): void {
    this.formControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.resolveIDs();
    this.submit$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const controlErrors = this.formControl.control.errors;
      this.showError = false;
      if (controlErrors) {
        this.showError = true;
      }
    });
    this.formControl.control.valueChanges.subscribe(value => {
      if (!value) {
        this.resetFileInput();
      }
    });
  }

  resolveIDs(): void {
    this.id = this.id || generateRandomString(5);
    this.idError = `e-${this.id}`;
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) { }

  resetFileInput() {
    this.previewImg.nativeElement.src = 'assets/image.png';
    this.inputFile.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
