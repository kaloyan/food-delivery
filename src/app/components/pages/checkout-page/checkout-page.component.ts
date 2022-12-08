import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  user!: User;

  constructor(
    cartService: CartService,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private orderService: OrderService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

  createOrder() {
    if (!this.order.latlong) {
      this.toastService.showWarningToast(
        'Waning: No location',
        'Please select your location on the map.'
      );
      return;
    }

    this.order.name = this.user.name;
    this.order.address = this.user.address;

    // post new order on server
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (error) => {
        this.toastService.showErrorToast('Error', error.message);
      },
    });
  }
}
