import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  @Input()
  isVisible = false;

  @Input()
  message = 'Nothing found.';

  @Input()
  resetText = 'Reset';

  @Input()
  resetRoute = '/';

  constructor() {}

  ngOnInit(): void {}
}
