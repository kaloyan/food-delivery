import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss'],
})
export class OrderTrackComponent implements OnInit {
  order!: Order;

  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;

    if (!params.orderId) return;

    orderService.trackById(params.orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
    });
  }

  ngOnInit(): void {}
}
