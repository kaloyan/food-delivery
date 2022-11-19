import { Injectable } from '@angular/core';
import { sample_food, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_food;
  }

  searchFood(query: string): Food[] {
    const result = this.getAll().filter((food) =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getFoodByTag(tag: string): Food[] {
    if (tag === 'All') {
      return this.getAll();
    } else {
      return this.getAll().filter((food) => food.tags?.includes(tag));
    }
  }
}
