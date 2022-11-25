import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.loadCart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id == food.id);

    if (cartItem) {
      return;
    }

    let item = new CartItem(food);
    this.cart.items.push(item);
    this.saveCart();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.saveCart();
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.food.id == foodId);

    if (!cartItem) {
      return;
    }

    cartItem.count = quantity;
    cartItem.price = cartItem.food.price * quantity;

    this.saveCart();
  }

  clearCart(): void {
    this.cart = new Cart();
    this.saveCart();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private saveCart(): void {
    // first calculae total price
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, item) => item.price + sum,
      0
    );

    // next: calculate total items count
    this.cart.totalCount = this.cart.items.reduce(
      (count, item) => item.count + count,
      0
    );

    // next: convert cart to json string and save to localstorage
    const cartStr = JSON.stringify(this.cart);
    localStorage.setItem('_cart', cartStr);

    // notify all listeners of the observable
    this.cartSubject.next(this.cart);
  }

  private loadCart(): Cart {
    const cartStr = localStorage.getItem('_cart');

    return cartStr ? JSON.parse(cartStr) : new Cart();
  }
}
