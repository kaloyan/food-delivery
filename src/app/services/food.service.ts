import { Injectable } from '@angular/core';
import { sample_food } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_food;
  }
}