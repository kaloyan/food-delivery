import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    actvatedRoute.params.subscribe((params) => {
      if (params['query']) {
        this.foods = this.foodService.searchFood(params['query']);
      } else if (params['tag']) {
        this.foods = this.foodService.getFoodByTag(params['tag']);
      } else {
        this.foods = foodService.getAll();
      }
    });
  }

  ngOnInit(): void {}
}
