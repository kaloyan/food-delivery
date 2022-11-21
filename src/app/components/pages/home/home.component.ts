import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService, actvatedRoute: ActivatedRoute) {
    let foodObservable: Observable<Food[]>;

    actvatedRoute.params.subscribe((params) => {
      if (params['query']) {
        foodObservable = this.foodService.searchFood(params['query']);
      } else if (params['tag']) {
        foodObservable = this.foodService.getFoodByTag(params['tag']);
      } else {
        foodObservable = foodService.getAll();
      }

      foodObservable.subscribe((response) => {
        this.foods = response;
      });
    });
  }

  ngOnInit(): void {}
}
