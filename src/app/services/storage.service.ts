import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getUser(): User {
    const user = this.getItem('_user');

    if (user) {
      return user as User;
    } else {
      return new User();
    }
  }

  saveUser(user: User): void {
    this.setItem('_user', user);
  }

  removeUser(): void {
    this.removeItem('_user');
  }

  getLocation(): LatLng | null {
    const location = this.getItem('_location');

    if (location) {
      return location as LatLng;
    } else {
      return null;
    }
  }

  saveLocation(location: LatLng): void {
    this.setItem('_location', location);
  }

  removeLocation(): void {
    this.removeItem('_location');
  }

  private getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  }

  private setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
