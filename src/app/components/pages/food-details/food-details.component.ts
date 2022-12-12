import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { IMAGES_HOST } from '../../../shared/constants/urls';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent {
  food!: Food;
  imageHost = IMAGES_HOST;
  isFavorite: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['foodId']) {
        foodService.getFoodById(params['foodId']).subscribe((response) => {
          this.food = response;
          this.isFavorite = this.favoriteService.isFavorite(this.food.id);
        });
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');
  }

  addToFavorites() {
    this.isFavorite = true;
    this.favoriteService.addFavorite(this.food);
  }

  removeFromFavorites() {
    this.isFavorite = false;
    this.favoriteService.removeFavorite(this.food);
  }
}
