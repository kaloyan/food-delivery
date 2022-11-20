import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemsCount = 0;

  constructor(cartService: CartService) {
    cartService.getCartObservable().subscribe((cart) => {
      this.cartItemsCount = cart.totalCount;
    });
  }

  ngOnInit(): void {}
}
