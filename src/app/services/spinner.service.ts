import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  showSpinner() {
    this.isLoadingSubject.next(true);
  }

  hideSpinner() {
    this.isLoadingSubject.next(false);
  }

  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
