import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-popular-dishes',
  templateUrl: './popular-dishes.component.html',
  styleUrls: ['./popular-dishes.component.scss'],
})
export class PopularDishesComponent {
  foods: Food[] = [];

  constructor(foodService: FoodService) {
    let foodObservable: Observable<Food[]>;

    foodObservable = foodService.getPopularDishes();
    foodObservable.subscribe((response) => {
      this.foods = response;
    });
  }
}
