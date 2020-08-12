import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private dataSource = new BehaviorSubject<boolean>(false);
  isLoading = this.dataSource.asObservable();

  constructor() { }

  showLoading(value: boolean) {
    this.dataSource.next(value);
  }
}
