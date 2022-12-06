import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { IFoodResults } from 'src/app/shared/interfaces/IFoodResult';
import { Food } from 'src/app/shared/models/Food';
import { IMAGES_HOST } from '../../../shared/constants/urls';
import { PAGE_SIZE } from 'src/app/shared/constants/settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  pageSize = PAGE_SIZE;
  imageHost = IMAGES_HOST;
  itemsCount = 0;
  slice = {};

  constructor(private foodService: FoodService, actvatedRoute: ActivatedRoute) {
    let foodObservable: Observable<IFoodResults>;

    actvatedRoute.params.subscribe((params) => {
      if (params['query']) {
        if (params['num']) {
          foodObservable = this.foodService.searchFood(
            params['query'],
            params['num']
          );
        } else {
          foodObservable = this.foodService.searchFood(params['query']);
        }
      } else if (params['tag']) {
        foodObservable = this.foodService.getFoodByTag(params['tag']);
      } else if (params['num']) {
        foodObservable = foodService.getAll(params['num']);
      } else {
        foodObservable = foodService.getAll();
      }

      foodObservable.subscribe((response) => {
        this.foods = response.items;
        this.itemsCount = response.total;
        this.slice = response.slice;
      });
    });
  }

  ngOnInit(): void {}
}
