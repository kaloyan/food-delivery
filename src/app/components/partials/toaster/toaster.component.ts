import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { ToastService } from 'src/app/services/toast.service';
import { ToastEvent } from 'src/app/shared/interfaces/ToastEvent';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);

      // console.log(this.currentToasts);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
