import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FOODS_URL,
  FOOD_BY_ID_URL,
  FOOD_BY_TAG_URL,
  POPULAR_FOODS_URL,
  SEARCH_URL,
  TAGS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { IFoodResults } from '../shared/interfaces/IFoodResult';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(pageNum: number = 0): Observable<IFoodResults> {
    let url = FOODS_URL;

    if (pageNum > 0) {
      url += '/page/' + pageNum;
    }

    return this.http.get<IFoodResults>(url);
  }

  searchFood(query: string, num: number = 0): Observable<IFoodResults> {
    let url = SEARCH_URL + query;

    if (num > 0) {
      url += '/page/' + num;
    }

    return this.http.get<IFoodResults>(url);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TAGS_URL);
  }

  getFoodByTag(tag: string, num: number = 0): Observable<IFoodResults> {
    let url = FOOD_BY_TAG_URL + tag;

    if (num > 0) {
      url += '/page/' + num;
    }

    if (tag === 'All') {
      return this.getAll();
    } else {
      return this.http.get<IFoodResults>(url);
    }
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }

  getPopularDishes(): Observable<Food[]> {
    return this.http.get<Food[]>(POPULAR_FOODS_URL);
  }
}
