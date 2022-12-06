import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { IMAGES_HOST } from '../../../shared/constants/urls';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  imageHost = IMAGES_HOST;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.food.id);
  }

  changeQuanity(item: CartItem, qty: string): void {
    const quantity = parseInt(qty);

    this.cartService.changeQuantity(item.food.id, quantity);
  }
}
