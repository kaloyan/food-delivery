import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_HOST } from 'src/app/shared/constants/urls';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() food!: Food;
  imageHost: string = IMAGES_HOST;

  constructor() {}

  ngOnInit(): void {}
}
