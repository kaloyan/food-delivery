import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    pendingRequests++;

    return next.handle(request).pipe(
      tap({
        next: (ev: any) => {
          if (ev.type === 4) {
            this.hideSpinner();
          }
        },
        error: (_) => {
          this.hideSpinner();
        },
      })
    );
  }

  hideSpinner() {
    pendingRequests--;

    if (pendingRequests == 0) {
      this.spinnerService.hideSpinner();
    }
  }
}
