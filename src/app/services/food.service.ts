import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_food, sample_tags } from 'src/data';
import {
  FOODS_URL,
  FOOD_BY_ID_URL,
  FOOD_BY_TAG_URL,
  SEARCH_URL,
  TAGS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  searchFood(query: string): Observable<Food[]> {
    const result = this.http.get<Food[]>(SEARCH_URL + query);
    return result;
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TAGS_URL);
  }

  getFoodByTag(tag: string): Observable<Food[]> {
    if (tag === 'All') {
      return this.getAll();
    } else {
      return this.http.get<Food[]>(FOOD_BY_TAG_URL + tag);
    }
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
