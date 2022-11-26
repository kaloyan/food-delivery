import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private orderService: OrderService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;

    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastService.showWarningToast('Warning', 'Please fill the inputs');
      return;
    }

    if (!this.order.latlong) {
      this.toastService.showWarningToast(
        'Waning: No location',
        'Please select your location on the map.'
      );
      return;
    }

    this.order.name = this.formControls.name.value;
    this.order.address = this.formControls.address.value;

    // post new order on server
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (error) => {
        this.toastService.showErrorToast('Error', error);
      },
    });
  }
}
