import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoading!: boolean;

  constructor(spinnerService: SpinnerService) {
    spinnerService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit(): void {}
}
