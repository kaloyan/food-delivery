import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Food[]>(
    this.storageService.getFavorites()
  );
  public favoritesObservable: Observable<Food[]>;

  constructor(private storageService: StorageService) {
    this.favoritesObservable = this.favoritesSubject.asObservable();
  }

  addFavorite(food: Food) {
    const favorites = this.getAll();
    favorites.push(food);
    this.storageService.saveFavorites(favorites);
    this.favoritesSubject.next(favorites);
  }

  removeFavorite(food: Food) {
    let favorites = this.getAll();
    favorites = favorites.filter((item) => item.id != food.id);
    this.storageService.saveFavorites(favorites);
    this.favoritesSubject.next(favorites);
  }

  getAll(): Food[] {
    const foods = this.storageService.getFavorites();

    if (foods) {
      this.favoritesSubject.next(foods);
      return foods as Food[];
    } else {
      return [] as Food[];
    }
  }

  getCount(): number {
    const favorites = this.getAll();
    return favorites.length;
  }

  removeAll() {
    this.storageService.saveFavorites([] as Food[]);
    this.favoritesSubject.next([]);
  }

  isFavorite(foodId: string) {
    const favorites = this.getAll().filter((item) => item.id == foodId);
    return favorites.length > 0;
  }
}
