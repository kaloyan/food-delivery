import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ToastService } from 'src/app/services/toast.service';
import { Order } from 'src/app/shared/models/Order';
import { IMAGES_HOST } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  myOrders: Order[] = [];
  imagesHost = IMAGES_HOST;

  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.orderService.getMyOrdersHistory().subscribe({
      next: (response) => {
        this.myOrders = response.reverse();
      },
      error: (error) => {
        this.toastService.showErrorToast('Error', error.message);
      },
    });
  }
}
