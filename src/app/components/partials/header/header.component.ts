import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemsCount = 0;
  user!: User;
  favorites: Food[] = [];

  constructor(
    cartService: CartService,
    private userService: UserService,
    private favoritesService: FavoritesService
  ) {
    cartService.getCartObservable().subscribe((cart) => {
      this.cartItemsCount = cart.totalCount;
    });

    userService.userObservable.subscribe((user) => (this.user = user));

    favoritesService.favoritesObservable.subscribe({
      next: (favs) => {
        this.favorites = favs;
      },
    });
  }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getAll();
  }

  logout() {
    this.userService.logout();
  }

  get isLoggedIn() {
    return this.user.token;
  }
}
